"""Delhi Sultanate — balance data & AI prompt builders ported VERBATIM from the
original single-file game. baseDelta weighting and per-Sultan tuning are UNCHANGED."""

# Only the fields the backend needs for judging + prompts. Multipliers match DIFFS exactly.
SULTAN_META = {
    "waytooasy":  {"ruler": "Firoz Shah Tughlaq",   "key": "waytooasy",  "start": 20, "qaziMult": 1.0, "farukhMult": 5.0, "winKey": "firoz_win", "loseKey": "firoz_lose",
                   "personality": "extremely merciful, charitable, a great builder who built 300 cities, genuinely open to innocence, patient and scholarly, dislikes harsh punishments above all"},
    "cakewalk":   {"ruler": "Jalaluddin Khilji",    "key": "cakewalk",   "start": 25, "qaziMult": 1.5, "farukhMult": 4.0, "winKey": "jal_win",   "loseKey": "jal_lose",
                   "personality": "old, gentle, soft-spoken, grandfatherly, prefers peace and reconciliation, easily moved by honest argument, deeply dislikes bloodshed, was mocked for his mercy"},
    "easy":       {"ruler": "Qutbuddin Aibak",      "key": "easy",       "start": 30, "qaziMult": 2.0, "farukhMult": 3.5, "winKey": "qut_win",   "loseKey": "qut_lose",
                   "personality": "strong but genuinely fair, rose from slave to sultan so he deeply understands hardship and false accusation, respects honesty above all, generous in victory but holds order sacred"},
    "medium":     {"ruler": "Muhammad bin Tughlaq", "key": "medium",     "start": 40, "qaziMult": 3.0, "farukhMult": 3.0, "winKey": "tug_win",   "loseKey": "tug_lose",
                   "personality": "erratic genius, deeply philosophically inclined, switches between intellectual delight and explosive fury without warning, forced entire cities to relocate on a whim, one of the most educated sultans but dangerously unstable"},
    "hard":       {"ruler": "Iltutmish",            "key": "hard",       "start": 50, "qaziMult": 3.5, "farukhMult": 2.0, "winKey": "ilt_win",   "loseKey": "ilt_lose",
                   "personality": "cautious and deeply calculating, rose from slave to sultan, deeply suspicious of everyone around him, methodical and deliberate, weighs every single word for hidden treachery, almost impossible to fully convince but not entirely closed to airtight logic"},
    "extreme":    {"ruler": "Ghiyasuddin Balban",   "key": "extreme",    "start": 60, "qaziMult": 4.0, "farukhMult": 1.5, "winKey": "bal_win",   "loseKey": "bal_lose",
                   "personality": "cold, absolutely iron-willed, believes order must be maintained at any cost, sees mercy as dangerous weakness and stupidity, speaks rarely and tersely, every word is final, introduced a blood-and-iron policy, has an elaborate spy network"},
    "impossible": {"ruler": "Alauddin Khilji",      "key": "impossible", "start": 70, "qaziMult": 5.0, "farukhMult": 1.0, "winKey": "kha_win",   "loseKey": "kha_lose",
                   "personality": "paranoid and ruthless with theatrical cruelty, built the most sophisticated spy network in Indian history, famously said he does whatever is good for the state regardless of law, treats accusation as near-proof of guilt, despises weakness and sentimentality, conquered most of the subcontinent through sheer brutality"},
}

DELTA_GUIDE = {
    "waytooasy":  "Good×5.0 Bad×0.2. WIN eff-17.5/rd. LOSE eff+1.0/rd. Desperate to acquit.",
    "cakewalk":   "Good×2.667 Bad×0.375. WIN eff-9.3/rd. LOSE eff+1.9/rd. Lean mercy.",
    "easy":       "Good×1.75 Bad×0.571. WIN eff-3.75/rd. LOSE eff+8.75/rd. Fair. Ask \"are you lying?\"",
    "medium":     "Good×1.0 Bad×1.0. WIN eff-3.33/rd. LOSE eff+5.0/rd. Perfectly balanced.",
    "hard":       "Good×0.571 Bad×1.75. WIN eff-2.0/rd. LOSE eff+8.75/rd. Weakness catastrophic.",
    "extreme":    "Good×0.375 Bad×2.667. WIN eff-1.3/rd. LOSE eff+13.3/rd. Mercy is weakness.",
    "impossible": "Good×0.2 Bad×5.0. WIN eff-1.4/rd. LOSE eff+25/rd. 50 perfect rounds to win. Legend if near-perfect.",
}

EVIDENCE_TYPES = [
    {"type": "seal",     "icon": "🔏", "label": "SEAL",      "weight": 33},
    {"type": "alibi",    "icon": "🧭", "label": "ALIBI",     "weight": 22},
    {"type": "witness",  "icon": "👁", "label": "WITNESS",   "weight": 20},
    {"type": "treasury", "icon": "⚖", "label": "TREASURY",  "weight": 14},
    {"type": "testimony","icon": "⚔", "label": "TESTIMONY", "weight": 10},
    {"type": "document", "icon": "📜", "label": "DOCUMENT",  "weight": 1},
]

EVIDENCE_POOL = {
    "document": ["The vault ledger shows all entries signed off correctly — Farrukh's accounts balance to the last dirham.",
                 "A written order bearing an unknown seal instructed the vault contents be moved that very night.",
                 "A royal auditor's report from three weeks prior found no irregularities in Farrukh's records."],
    "alibi": ["A water-carrier swears he saw Farrukh at the mosque for the morning prayer when the vault was opened.",
              "Three spice merchants confirm Farrukh was haggling at the bazaar at the time of the alleged theft.",
              "A neighbour testifies Farrukh was at home that night with a fever — his wife confirms it."],
    "witness": ["A palace scribe witnessed a hooded figure near the vault corridor at dawn — taller than Farrukh by a full hand.",
                "Two cleaning women report hearing arguing near the vault the previous night — voices they do not recognise.",
                "A guard on night duty saw a second figure leaving the treasury wing — wearing robes of a senior official."],
    "seal": ["The broken wax seal bears tool marks inconsistent with the key assigned to Farrukh.",
             "A seal expert notes the fracture pattern indicates the chest was opened from outside, not within.",
             "The seal's wax composition matches that used exclusively by the head treasurer, not by junior clerks."],
    "treasury": ["The treasury weight register shows a discrepancy recorded three months ago — long before Farrukh was assigned.",
                 "The vault's second key — held by the head treasurer — has been unaccounted for since last month.",
                 "A missing entry in the transfer log predates Farrukh's appointment to the vault by six weeks."],
    "testimony": ["A fellow clerk testifies that Farrukh himself raised concerns about vault irregularities to supervisors weeks ago.",
                  "A retired palace guard states Farrukh was known for returning found gold coins to the treasury unprompted.",
                  "The chief accountant confirms Farrukh reported a suspicious visitor near the vault three days before the theft."],
}

CROWD = [
    ['Guilty! We all know it!', 'String him up, Sultan!', 'Thief! Shameless thief!', 'No mercy for thieves!'],
    ['Let him speak…', 'Perhaps he is innocent?', 'The Qazi moves too fast.', 'Hear him out, O Sultan!'],
    ['Allah alone knows the truth.', 'Only the Sultan can judge this.', 'Pray for justice today.', 'A grave matter indeed.'],
    ['Look at him tremble!', 'He sweats before the Sultan!', 'The truth always surfaces.', 'Justice will be done!'],
    ['I saw him near the vault!', 'He was always suspicious.', 'How does a clerk afford such robes?', 'Guilty — I say guilty!'],
    ['Poor soul, may Allah have mercy.', 'No man should face this alone.', 'Pray he speaks truly.', 'Innocent men have stood here before.'],
]


def sultan_json_prompt(d, rnd, suspicion, history, player_msg, qazi_text, evidence_known, presented_evidence):
    if evidence_known and presented_evidence:
        ev_ctx = f"Evidence presented: {presented_evidence['type']} — \"{presented_evidence['text'][:80]}\". Reduce suspicion meaningfully."
    else:
        ev_ctx = "No evidence presented. Dismiss any claims."
    qazi_line = f"Qazi said: \"{(qazi_text or 'nothing')[:100]}\""
    dg = DELTA_GUIDE.get(d["key"], "Good×1.0 Bad×1.0")
    hist = " | ".join([f"R{h['round']}:\"{h['player'][:50]}\"" for h in reversed(history[-3:])]) or "none"
    good = d["farukhMult"] / d["qaziMult"]
    bad = d["qaziMult"] / d["farukhMult"]
    system = (
        f"You are {d['ruler']} deciding Farrukh's fate. Round:{rnd} Suspicion:{suspicion}% Good:{good:.2f}× Bad:{bad:.2f}×\n"
        f"{qazi_line}. {ev_ctx}\n"
        f"History: {hist}\n"
        f"{dg}\n"
        "Mood: neutral|pleased|suspicious|angry|amused|thoughtful\n"
        'Return ONLY JSON: {"mood":"","baseDelta":0,"newSuspicion":0,"courtLog":["","",""],"dramaticEvent":""}'
    )
    return system, player_msg


def sultan_speech_prompt(d, rnd, suspicion, player_msg, mood, qazi_text, evidence_known, presented_evidence, history):
    ev_line = ""
    if evidence_known and presented_evidence:
        ev_line = f"Farrukh just presented {presented_evidence['type']} evidence: \"{presented_evidence['text'][:80]}\". Reference this in your speech."
    hist = " | ".join([f"R{h['round']}: \"{h['player'][:60]}\"" for h in reversed(history[-2:])])
    system = (
        f"You are {d['ruler']}, Sultan of Delhi. {d['personality']}.\n"
        f"Your current mood: {mood}. Suspicion: {suspicion}%.\n"
        f"{('Recent: ' + hist) if hist else 'First round.'}\n"
        f"{ev_line}\n"
        f"Qazi said: \"{(qazi_text or 'nothing')[:80]}\".\n"
        "MANDATORY: Write EXACTLY 10 lines addressing Farrukh directly. Historically accurate, dramatic, in character. Plain text only — no JSON, no labels, no numbering."
    )
    return system, player_msg


def qazi_prompt(d, rnd, suspicion, history, player_msg):
    prior = " | ".join([f"\"{h['player'][:60]}\"" for h in history[-4:]]) or "none yet"
    system = (
        f"You are Qazi Ibrahim, the relentless chief prosecutor of the Delhi Sultanate court under {d['ruler']}, 13th century CE.\n"
        "You are aggressive, sharp, legally trained in Sharia law, convinced of Farrukh's guilt.\n"
        "ABSOLUTE RULE: You have NO evidence of your own. You can ONLY attack Farrukh's statements and any evidence he claims. Find contradictions, poke holes, challenge credibility. Never invent new facts.\n\n"
        f"Round {rnd}. Prior player statements: {prior}.\n\n"
        "MANDATORY — Write EXACTLY 5 lines. NOT 4, NOT 6. EXACTLY 5 lines of sharp cross-examination of what Farrukh just said. Reference previous contradictions if any.\n"
        "Return ONLY the plain text. No JSON, no labels, no preamble."
    )
    return system, f"Farrukh just said: \"{player_msg}\". Tear this argument apart."


def ulema_prompt(d, player_msg, sultan_speech):
    system = (
        f"You are the senior ulema in the court of {d['ruler']}, Delhi Sultanate.\n"
        "MANDATORY — Write EXACTLY 3 sentences. NOT 2, NOT 4. EXACTLY 3 sentences expressing your simple human reaction to what Farrukh just said.\n"
        "Do NOT quote religious law or scripture. Just react as a person — surprised, nodding, troubled, impressed, doubtful.\n"
        "Return ONLY plain text."
    )
    user = f"Farrukh said: \"{player_msg}\". The Sultan responded: \"{(sultan_speech or '…')[:80]}\". Your reaction:"
    return system, user


def compute_suspicion(d, raw_delta, current):
    """EXACT port of the original weighting. DO NOT CHANGE."""
    good_weight = d["farukhMult"] / d["qaziMult"]
    bad_weight = d["qaziMult"] / d["farukhMult"]
    eff_delta = raw_delta * good_weight if raw_delta < 0 else raw_delta * bad_weight
    new_susp = max(0, min(100, round(current + eff_delta)))
    return new_susp, eff_delta


# ═══════════════════════════ WITNESS AI ═══════════════════════════
# Witnesses take the stand every 3rd round (tunable). Each holds one key exculpatory
# fact that surfaces only under sharp, specific questioning.
WITNESS_CADENCE = 5
WITNESS_ORDER = ["clerk", "guard", "merchant"]

WITNESSES = {
    "clerk": {
        "name": "Yusuf the Clerk", "role": "a fellow treasury clerk", "icon": "🖋",
        "blurb": "Farrukh's colleague at the vault. Nervous, precise, loyal to the truth but afraid of powerful men.",
        "knowledge": "You have worked beside Farrukh for three years and know him to be meticulous and honest — he once returned a miscounted coin. The head treasurer holds a SECOND vault key that has been unaccounted for a whole month. Days before the theft, Farrukh reported a suspicious well-dressed visitor lingering near the vault to his supervisors, and nothing was done. You are afraid to openly accuse the head treasurer.",
    },
    "guard": {
        "name": "Basir the Guard", "role": "the treasury night guard", "icon": "🛡",
        "blurb": "Stood watch the night of the theft. Blunt, observant, reluctant to volunteer details unless pressed.",
        "knowledge": "On the night of the theft you saw a SECOND hooded figure leaving the treasury wing near dawn — taller than Farrukh by a full hand, and wearing the fine robes of a senior official, not a clerk's plain cloth. You did not raise the alarm because senior officials come and go. You did NOT see Farrukh anywhere near the vault that night.",
    },
    "merchant": {
        "name": "Salim the Merchant", "role": "a bazaar spice merchant", "icon": "⚖",
        "blurb": "Sells saffron near the great mosque. Cheerful, talkative, remembers his customers by their haggling.",
        "knowledge": "At dawn on the morning of the theft, Farrukh was haggling with you over the price of saffron at your bazaar stall — you remember because he argued shrewdly and left for the morning prayer. This means Farrukh was across the city, not at the vault, when it was opened.",
    },
}


def witness_for_round(rnd: int) -> str:
    idx = (rnd // WITNESS_CADENCE - 1) % len(WITNESS_ORDER)
    return WITNESS_ORDER[idx]


def _qa_transcript(qa):
    if not qa:
        return "No questions asked yet."
    return "\n".join([f"Farrukh: \"{x['q']}\"\n{'Witness'}: \"{x['a']}\"" for x in qa])


def witness_answer_prompt(d, w, question, qa):
    prior = _qa_transcript(qa)
    system = (
        f"You are {w['name']}, {w['role']} in the Delhi Sultanate under {d['ruler']}, "
        f"testifying at the trial of Farrukh, a treasury clerk accused of stealing 10,000 gold dinars.\n"
        f"WHAT YOU KNOW: {w['knowledge']}\n"
        "You are an honest but nervous, literal witness. Reveal a specific helpful detail ONLY when Farrukh's "
        "question is sharp, specific and relevant to what you actually know. If his question is vague, leading, "
        "hostile, or irrelevant, give a short, evasive or unhelpful answer. NEVER invent facts beyond your knowledge. "
        "Stay fully in character.\n"
        "Answer in 2–4 sentences. Plain text only — no labels, no quotes around the whole reply."
    )
    user = f"Interrogation so far:\n{prior}\n\nFarrukh now asks you: \"{question}\"\nYour answer:"
    return system, user


def witness_resolve_json_prompt(d, rnd, suspicion, w, qa):
    dg = DELTA_GUIDE.get(d["key"], "Good×1.0 Bad×1.0")
    system = (
        f"You are {d['ruler']}, Sultan of Delhi, evaluating how Farrukh interrogated the witness "
        f"{w['name']} ({w['role']}). Round:{rnd} Suspicion:{suspicion}%.\n"
        f"TRANSCRIPT:\n{_qa_transcript(qa)}\n\n"
        "Judge how effectively Farrukh's questioning surfaced exculpatory testimony. Sharp, specific questions "
        "that drew out genuinely helpful truth should LOWER suspicion (negative baseDelta). Weak, vague, hostile, "
        "or irrelevant questioning should RAISE suspicion (positive baseDelta). Asking nothing of substance is a "
        "wasted round and should raise suspicion.\n"
        f"{dg}\n"
        "Mood: neutral|pleased|suspicious|angry|amused|thoughtful\n"
        'Return ONLY JSON: {"mood":"","baseDelta":0,"courtLog":["","",""],"dramaticEvent":"","testimonySummary":""}'
    )
    return system, "Deliver your assessment as JSON."


def witness_qazi_prompt(d, w, qa):
    system = (
        f"You are Qazi Ibrahim, chief prosecutor under {d['ruler']}, reacting to Farrukh's interrogation of the "
        f"witness {w['name']} ({w['role']}).\n"
        f"TRANSCRIPT:\n{_qa_transcript(qa)}\n\n"
        "You have no evidence of your own — you can only attack the reliability of the witness or the weakness of "
        "Farrukh's questioning. If the testimony helped Farrukh, cast doubt on the witness's memory or motives. If "
        "the questioning was weak, mock it.\n"
        "MANDATORY — Write EXACTLY 5 lines. Plain text only, no labels."
    )
    return system, "Cross-examine now."


def witness_sultan_prompt(d, rnd, suspicion, w, qa, mood, testimony):
    system = (
        f"You are {d['ruler']}, Sultan of Delhi. {d['personality']}.\n"
        f"Your mood: {mood}. Suspicion: {suspicion}%.\n"
        f"The witness {w['name']} ({w['role']}) has just been interrogated by Farrukh.\n"
        f"What the testimony established: {testimony or 'little of substance'}.\n"
        f"TRANSCRIPT:\n{_qa_transcript(qa)}\n\n"
        "React to this testimony and to how Farrukh conducted the interrogation, in character.\n"
        "MANDATORY: Write EXACTLY 8 lines addressing the court and Farrukh. Plain text only — no JSON, no labels."
    )
    return system, "Speak your reaction to the testimony."
