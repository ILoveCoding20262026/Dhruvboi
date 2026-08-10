import os
import re
import json
import uuid
import random
import asyncio
import logging
from pathlib import Path
from datetime import datetime, timezone, timedelta

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import jwt
import bcrypt
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Any

from emergentintegrations.llm.chat import LlmChat, UserMessage

import sultans as S

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("delhi-court")

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALG = "HS256"
EMERGENT_LLM_KEY = os.environ['EMERGENT_LLM_KEY']
CLAUDE_MODEL = "claude-sonnet-4-6"

app = FastAPI()
api = APIRouter(prefix="/api")


# ═══════════════════════════════ AUTH ═══════════════════════════════
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode(), hashed.encode())
    except Exception:
        return False


def create_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email,
               "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "access"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


async def get_current_user(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        user = await db.users.find_one({"user_id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if user:
            return user
    except jwt.PyJWTError:
        pass
    raise HTTPException(status_code=401, detail="Invalid or expired session")


class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str = Field(min_length=1)


class LoginIn(BaseModel):
    email: EmailStr
    password: str


def public_user(u: dict) -> dict:
    return {"user_id": u["user_id"], "email": u["email"], "name": u.get("name", "")}


@api.post("/auth/register")
async def register(body: RegisterIn):
    email = body.email.lower()
    if await db.users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    uid = f"user_{uuid.uuid4().hex[:12]}"
    await db.users.insert_one({
        "user_id": uid, "email": email, "name": body.name,
        "password_hash": hash_password(body.password), "provider": "local",
        "created_at": datetime.now(timezone.utc),
    })
    token = create_token(uid, email)
    return {"token": token, "user": {"user_id": uid, "email": email, "name": body.name}}


@api.post("/auth/login")
async def login(body: LoginIn):
    email = body.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(user["user_id"], email)
    return {"token": token, "user": public_user(user)}


@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return public_user(user)


# ═══════════════════════════ CLAUDE PROXY ═══════════════════════════
async def call_claude(system: str, user_text: str, max_tokens: int, retries: int = 4) -> str:
    last_err = None
    for attempt in range(retries):
        try:
            chat = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=f"court-{uuid.uuid4().hex}",
                system_message=system,
            ).with_model("anthropic", CLAUDE_MODEL).with_params(max_tokens=max_tokens)
            resp = await chat.send_message(UserMessage(text=user_text))
            if isinstance(resp, str):
                return resp
            return getattr(resp, "content", "") or str(resp)
        except Exception as e:  # noqa
            last_err = e
            logger.warning(f"Claude call failed (attempt {attempt+1}): {e}")
            await asyncio.sleep(1.5 * (attempt + 1))
    raise HTTPException(status_code=502, detail=f"AI unavailable: {last_err}")


def robust_json(raw: str, current: int) -> dict:
    """Ported JSON recovery strategies S1–S7. Game never crashes on bad AI JSON."""
    def try_parse(s):
        try:
            p = json.loads(s)
            return p if isinstance(p, dict) else None
        except Exception:
            return None

    sp = try_parse(re.sub(r'```json|```', '', raw).strip())
    if not sp:
        i, j = raw.find('{'), raw.rfind('}')
        if i != -1 and j > i:
            sp = try_parse(raw[i:j + 1])
    if not sp:
        i, j = raw.find('{'), raw.rfind('}')
        if i != -1 and j > i:
            fixed = re.sub(r',\s*([}\]])', r'\1', raw[i:j + 1])
            sp = try_parse(fixed)
    if not sp:
        i, j = raw.find('{'), raw.rfind('}')
        if i != -1 and j > i:
            fixed = raw[i:j + 1]
            fixed = re.sub(r',\s*([}\]])', r'\1', fixed)
            fixed = fixed.replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t')
            sp = try_parse(fixed)
    if not sp:
        # field-by-field extraction
        def ex(key, fb):
            m = re.search(rf'"{key}"\s*:\s*"([^"]*)"', raw, re.I)
            return m.group(1) if m else fb

        def exn(key, fb):
            m = re.search(rf'"{key}"\s*:\s*(-?[0-9]+(?:\.[0-9]+)?)', raw, re.I)
            return float(m.group(1)) if m else fb

        def exa(key):
            m = re.search(rf'"{key}"\s*:\s*\[([^\]]*)\]', raw, re.I)
            if not m:
                return None
            return re.findall(r'"([^"]*)"', m.group(1)) or None

        if re.search(r'"baseDelta"', raw):
            sp = {
                "mood": ex("mood", "neutral"),
                "baseDelta": exn("baseDelta", 2),
                "newSuspicion": exn("newSuspicion", min(100, current + 2)),
                "courtLog": exa("courtLog") or ["The court deliberates."],
                "dramaticEvent": ex("dramaticEvent", "Silence hangs over the court."),
            }
    if not sp:
        logger.warning(f"All JSON parse strategies failed. Raw: {raw[:200]}")
        sp = {
            "mood": "suspicious",
            "baseDelta": 2,
            "newSuspicion": min(100, current + 2),
            "courtLog": ["The Sultan deliberates.", "The court waits in silence.", "Qazi Ibrahim watches closely."],
            "dramaticEvent": "A heavy silence descends upon the Diwan-i-Am.",
        }
    # validate types
    if not isinstance(sp.get("baseDelta"), (int, float)):
        sp["baseDelta"] = 0
    if not isinstance(sp.get("courtLog"), list) or not sp["courtLog"]:
        sp["courtLog"] = ["The court deliberates."]
    if not isinstance(sp.get("dramaticEvent"), str):
        sp["dramaticEvent"] = ""
    if not isinstance(sp.get("mood"), str):
        sp["mood"] = "neutral"
    return sp


PRESENT_RE = re.compile(
    r'\b(i present|presenting|let me present|i show|showing|i reveal|revealing|i submit|submitting|i produce|'
    r'producing|i offer|offering|i put forward|i bring|bringing forth|i introduce|introducing|i demonstrate|'
    r'demonstrating|i display|displaying|i exhibit|exhibiting|exhibit|i tender|i proffer|i adduce|i cite|citing|'
    r'i invoke|invoking|i point to|pointing to|i refer to this|behold|observe|regard|note this|consider this|'
    r'here is|here are|look here|look at this|this document|this seal|this scroll|this record|this evidence|'
    r'this proof|this testimony|this alibi|this witness|this treasury record|i have proof|i have evidence|'
    r'i have a document|i have a record|i have a witness|i have an alibi|i have a seal|as you can see|as shown|as proven)\b',
    re.I,
)


def roll_evidence():
    total = sum(e["weight"] for e in S.EVIDENCE_TYPES)
    r = random.random() * total
    for e in S.EVIDENCE_TYPES:
        r -= e["weight"]
        if r <= 0:
            return e
    return S.EVIDENCE_TYPES[0]


def generate_evidence(rnd: int) -> dict:
    ev = roll_evidence()
    pool = S.EVIDENCE_POOL.get(ev["type"], S.EVIDENCE_POOL["document"])
    return {"type": ev["type"], "text": random.choice(pool), "icon": ev["icon"],
            "label": ev["label"], "round": rnd}


class HistoryItem(BaseModel):
    round: int
    player: str
    sultan: str = ""
    qazi: str = ""


class EvidenceItem(BaseModel):
    type: str
    text: str
    icon: str = ""
    label: str = ""
    round: int = 0


class TurnIn(BaseModel):
    diffKey: str
    round: int
    suspicion: int
    playerMsg: str
    history: List[HistoryItem] = []
    evidence: List[EvidenceItem] = []


@api.post("/trial/turn")
async def trial_turn(body: TurnIn, user: dict = Depends(get_current_user)):
    d = S.SULTAN_META.get(body.diffKey) or S.SULTAN_META["medium"]
    msg = body.playerMsg.strip()
    if not msg:
        raise HTTPException(status_code=400, detail="Empty argument")
    history = [h.model_dump() for h in body.history]
    evidence = [e.model_dump() for e in body.evidence]

    # detect presentation (exploit-proof: only against evidence actually granted)
    presented = None
    if PRESENT_RE.search(msg) and evidence:
        ml = msg.lower()
        presented = next((e for e in evidence if e["type"] in ml or (e.get("label", "").lower() in ml)), None) or evidence[-1]
    is_presenting = presented is not None

    last_qazi = history[-1]["qazi"] if history else ""

    qazi_sys, qazi_u = S.qazi_prompt(d, body.round, body.suspicion, history, msg)
    json_sys, json_u = S.sultan_json_prompt(d, body.round, body.suspicion, history, msg, last_qazi, is_presenting, presented)
    ulema_sys, ulema_u = S.ulema_prompt(d, msg, "")

    qazi_text, json_raw, ulema_text = await asyncio.gather(
        call_claude(qazi_sys, qazi_u, 350),
        call_claude(json_sys, json_u, 200),
        call_claude(ulema_sys, ulema_u, 80),
    )

    sp = robust_json(json_raw, body.suspicion)
    raw_delta = float(sp.get("baseDelta") or 0)
    new_susp, eff_delta = S.compute_suspicion(d, raw_delta, body.suspicion)

    speech_sys, speech_u = S.sultan_speech_prompt(d, body.round, body.suspicion, msg, sp.get("mood", "neutral"),
                                                  qazi_text, is_presenting, presented, history)
    sultan_speech = await call_claude(speech_sys, speech_u, 800)
    if not (sultan_speech and sultan_speech.strip()):
        sultan_speech = "The Sultan regards you in silence, weighing your words against the evidence before him."

    crowd = random.choice(S.CROWD)
    citizen = random.choice(crowd)

    new_ev = generate_evidence(body.round) if body.round % 2 == 0 else None

    ending = None
    if new_susp <= 0:
        ending = d["winKey"]
    elif new_susp >= 100:
        ending = d["loseKey"]

    return {
        "qaziText": qazi_text or "…",
        "sultanSpeech": sultan_speech,
        "ulemaText": ulema_text or "…",
        "citizenLine": citizen,
        "mood": sp.get("mood", "neutral"),
        "baseDelta": raw_delta,
        "effDelta": round(eff_delta, 2),
        "prevSuspicion": body.suspicion,
        "newSuspicion": new_susp,
        "courtLog": sp.get("courtLog", []),
        "dramaticEvent": sp.get("dramaticEvent", ""),
        "isPresenting": is_presenting,
        "presentedEvidence": presented,
        "newEvidence": new_ev,
        "ending": ending,
    }


# ═══════════════════════════ WITNESS ROUNDS ═══════════════════════════
class QAItem(BaseModel):
    q: str
    a: str


class WitnessAskIn(BaseModel):
    diffKey: str
    witnessType: str
    question: str
    qa: List[QAItem] = []


@api.post("/trial/witness/ask")
async def witness_ask(body: WitnessAskIn, user: dict = Depends(get_current_user)):
    d = S.SULTAN_META.get(body.diffKey) or S.SULTAN_META["medium"]
    w = S.WITNESSES.get(body.witnessType) or S.WITNESSES["clerk"]
    q = body.question.strip()
    if not q:
        raise HTTPException(status_code=400, detail="Empty question")
    qa = [x.model_dump() for x in body.qa]
    sys_p, user_p = S.witness_answer_prompt(d, w, q, qa)
    answer = await call_claude(sys_p, user_p, 250)
    if not (answer and answer.strip()):
        answer = f"{w['name']} shifts uneasily and offers little of substance."
    return {"answer": answer}


class WitnessResolveIn(BaseModel):
    diffKey: str
    round: int
    suspicion: int
    witnessType: str
    qa: List[QAItem] = []
    history: List[HistoryItem] = []


@api.post("/trial/witness/resolve")
async def witness_resolve(body: WitnessResolveIn, user: dict = Depends(get_current_user)):
    d = S.SULTAN_META.get(body.diffKey) or S.SULTAN_META["medium"]
    w = S.WITNESSES.get(body.witnessType) or S.WITNESSES["clerk"]
    qa = [x.model_dump() for x in body.qa]

    json_sys, json_u = S.witness_resolve_json_prompt(d, body.round, body.suspicion, w, qa)
    qazi_sys, qazi_u = S.witness_qazi_prompt(d, w, qa)
    json_raw, qazi_text = await asyncio.gather(
        call_claude(json_sys, json_u, 220),
        call_claude(qazi_sys, qazi_u, 350),
    )

    sp = robust_json(json_raw, body.suspicion)
    testimony = sp.get("testimonySummary") or ""
    if not isinstance(testimony, str):
        testimony = ""
    raw_delta = float(sp.get("baseDelta") or 0)
    new_susp, eff_delta = S.compute_suspicion(d, raw_delta, body.suspicion)

    speech_sys, speech_u = S.witness_sultan_prompt(d, body.round, body.suspicion, w, qa, sp.get("mood", "neutral"), testimony)
    sultan_speech = await call_claude(speech_sys, speech_u, 700)
    if not (sultan_speech and sultan_speech.strip()):
        sultan_speech = "The Sultan weighs the testimony in silence, his expression unreadable."

    citizen = random.choice(random.choice(S.CROWD))
    new_ev = generate_evidence(body.round) if body.round % 2 == 0 else None

    ending = None
    if new_susp <= 0:
        ending = d["winKey"]
    elif new_susp >= 100:
        ending = d["loseKey"]

    return {
        "witnessName": w["name"],
        "qaziText": qazi_text or "…",
        "sultanSpeech": sultan_speech,
        "citizenLine": citizen,
        "mood": sp.get("mood", "neutral"),
        "baseDelta": raw_delta,
        "effDelta": round(eff_delta, 2),
        "prevSuspicion": body.suspicion,
        "newSuspicion": new_susp,
        "courtLog": sp.get("courtLog", []),
        "dramaticEvent": sp.get("dramaticEvent", ""),
        "testimonySummary": testimony,
        "newEvidence": new_ev,
        "ending": ending,
    }


# ═══════════════════════════ SAVE / LOAD ═══════════════════════════
class SaveIn(BaseModel):
    diffKey: str
    round: int
    suspicion: int
    mood: str = "neutral"
    history: List[Any] = []
    evidence: List[Any] = []
    courtLogs: List[Any] = []
    chatLog: List[Any] = []


@api.post("/trial/save")
async def save_trial(body: SaveIn, user: dict = Depends(get_current_user)):
    doc = body.model_dump()
    doc["user_id"] = user["user_id"]
    doc["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.saves.update_one({"user_id": user["user_id"]}, {"$set": doc}, upsert=True)
    return {"ok": True}


@api.get("/trial/current")
async def current_trial(user: dict = Depends(get_current_user)):
    doc = await db.saves.find_one({"user_id": user["user_id"]}, {"_id": 0, "user_id": 0})
    return doc or None


@api.delete("/trial/current")
async def delete_trial(user: dict = Depends(get_current_user)):
    await db.saves.delete_one({"user_id": user["user_id"]})
    return {"ok": True}


class CompleteIn(BaseModel):
    diffKey: str
    ruler: str
    result: str  # "win" | "lose"
    rounds: int
    finalSuspicion: int


@api.post("/trial/complete")
async def complete_trial(body: CompleteIn, user: dict = Depends(get_current_user)):
    await db.matches.insert_one({
        "user_id": user["user_id"], **body.model_dump(),
        "played_at": datetime.now(timezone.utc).isoformat(),
    })
    await db.saves.delete_one({"user_id": user["user_id"]})
    return {"ok": True}


@api.get("/stats")
async def stats(user: dict = Depends(get_current_user)):
    matches = await db.matches.find({"user_id": user["user_id"]}, {"_id": 0}).sort("played_at", -1).to_list(200)
    wins = sum(1 for m in matches if m["result"] == "win")
    return {
        "total": len(matches),
        "wins": wins,
        "losses": len(matches) - wins,
        "history": matches[:20],
    }


@api.get("/")
async def root():
    return {"message": "Delhi Sultanate Court API"}


app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    try:
        await db.users.create_index("email", unique=True)
        await db.users.create_index("user_id", unique=True)
        await db.saves.create_index("user_id", unique=True)
    except Exception as e:
        logger.warning(f"index setup: {e}")


@app.on_event("shutdown")
async def shutdown():
    client.close()
