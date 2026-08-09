"""Backend tests for Delhi Sultanate Court API — auth, trial turn, balance, evidence, save/load, stats."""
import os
import time
import uuid
import requests
import pytest

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else None
if not BASE_URL:
    # Read from frontend .env directly
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")

API = f"{BASE_URL}/api"
TEST_EMAIL = "farrukh@test.com"
TEST_PASSWORD = "vault123"


@pytest.fixture(scope="session")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": TEST_EMAIL, "password": TEST_PASSWORD}, timeout=15)
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    return r.json()["token"]


@pytest.fixture(scope="session")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ═══ AUTH ═══
class TestAuth:
    def test_register_new_user(self):
        email = f"test_{uuid.uuid4().hex[:8]}@test.com"
        r = requests.post(f"{API}/auth/register", json={"email": email, "password": "pw12345", "name": "TestUser"}, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 10
        assert data["user"]["email"] == email
        assert data["user"]["name"] == "TestUser"
        assert "user_id" in data["user"]

    def test_login_existing_user(self):
        r = requests.post(f"{API}/auth/login", json={"email": TEST_EMAIL, "password": TEST_PASSWORD}, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "token" in data
        assert data["user"]["email"] == TEST_EMAIL

    def test_login_invalid_password(self):
        r = requests.post(f"{API}/auth/login", json={"email": TEST_EMAIL, "password": "wrong-pass"}, timeout=15)
        assert r.status_code == 401

    def test_me_returns_user(self, auth_headers):
        r = requests.get(f"{API}/auth/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        assert r.json()["email"] == TEST_EMAIL

    def test_me_without_token(self):
        r = requests.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 401


# ═══ TRIAL TURN (LLM — takes 10–25s per call) ═══
class TestTrialTurn:
    def test_turn_medium_returns_all_fields(self, auth_headers):
        body = {
            "diffKey": "medium", "round": 1, "suspicion": 40,
            "playerMsg": "By Allah I swear I am innocent. I was at the mosque during the theft, and the treasury ledger shows no discrepancy in my accounts.",
            "history": [], "evidence": [],
        }
        r = requests.post(f"{API}/trial/turn", json=body, headers=auth_headers, timeout=90)
        assert r.status_code == 200, r.text
        d = r.json()
        for key in ["qaziText", "sultanSpeech", "ulemaText", "citizenLine", "mood", "baseDelta",
                    "effDelta", "prevSuspicion", "newSuspicion", "courtLog", "dramaticEvent",
                    "isPresenting", "presentedEvidence", "newEvidence", "ending"]:
            assert key in d, f"missing key {key}"
        assert d["qaziText"] and len(d["qaziText"].strip()) > 10
        assert d["sultanSpeech"] and len(d["sultanSpeech"].strip()) > 10
        assert d["prevSuspicion"] == 40
        assert isinstance(d["courtLog"], list)
        assert d["isPresenting"] is False
        assert d["presentedEvidence"] is None
        # Round 1 is odd → newEvidence should be None
        assert d["newEvidence"] is None, f"Round 1 should not grant evidence, got {d['newEvidence']}"

    def test_turn_even_round_grants_evidence(self, auth_headers):
        body = {
            "diffKey": "medium", "round": 2, "suspicion": 40,
            "playerMsg": "Consider the evidence carefully. I have served the treasury loyally for years.",
            "history": [], "evidence": [],
        }
        r = requests.post(f"{API}/trial/turn", json=body, headers=auth_headers, timeout=90)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["newEvidence"] is not None, "Round 2 must grant new evidence"
        ev = d["newEvidence"]
        for k in ["type", "text", "icon", "label"]:
            assert k in ev and ev[k]

    def test_empty_message_rejected(self, auth_headers):
        r = requests.post(f"{API}/trial/turn", json={"diffKey": "medium", "round": 1,
                          "suspicion": 40, "playerMsg": "   ", "history": [], "evidence": []},
                          headers=auth_headers, timeout=30)
        assert r.status_code == 400

    def test_turn_requires_auth(self):
        r = requests.post(f"{API}/trial/turn", json={"diffKey": "medium", "round": 1,
                          "suspicion": 40, "playerMsg": "hi", "history": [], "evidence": []}, timeout=30)
        assert r.status_code == 401


# ═══ BALANCE (uses local import — no LLM) ═══
class TestBalance:
    def test_compute_suspicion_medium(self):
        import sys
        sys.path.insert(0, "/app/backend")
        import sultans as S
        d = S.SULTAN_META["medium"]
        new, eff = S.compute_suspicion(d, -5.0, 40)
        assert eff == -5.0  # good×1.0
        assert new == 35
        new, eff = S.compute_suspicion(d, 5.0, 40)
        assert eff == 5.0
        assert new == 45

    def test_compute_suspicion_waytooasy(self):
        import sys
        sys.path.insert(0, "/app/backend")
        import sultans as S
        d = S.SULTAN_META["waytooasy"]
        # good arg (negative) × 5.0
        new, eff = S.compute_suspicion(d, -5.0, 20)
        assert eff == -25.0
        assert new == 0  # clamped to 0 (win)
        # bad arg (positive) × 0.2
        new, eff = S.compute_suspicion(d, 5.0, 20)
        assert abs(eff - 1.0) < 0.001
        assert new == 21

    def test_compute_suspicion_impossible(self):
        import sys
        sys.path.insert(0, "/app/backend")
        import sultans as S
        d = S.SULTAN_META["impossible"]
        # good × 0.2, bad × 5.0
        _, eff = S.compute_suspicion(d, -5.0, 50)
        assert abs(eff - (-1.0)) < 0.001
        _, eff = S.compute_suspicion(d, 5.0, 50)
        assert abs(eff - 25.0) < 0.001


# ═══ EVIDENCE PRESENTATION ═══
class TestEvidencePresentation:
    def test_presenting_with_evidence_works(self, auth_headers):
        evidence = [{"type": "seal", "text": "The broken wax seal bears tool marks inconsistent with the key assigned to Farrukh.",
                     "icon": "🔏", "label": "SEAL", "round": 2}]
        body = {
            "diffKey": "medium", "round": 3, "suspicion": 40,
            "playerMsg": "I present this seal — behold the tool marks that prove tampering from outside.",
            "history": [], "evidence": evidence,
        }
        r = requests.post(f"{API}/trial/turn", json=body, headers=auth_headers, timeout=90)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["isPresenting"] is True
        assert d["presentedEvidence"] is not None
        assert d["presentedEvidence"]["type"] == "seal"

    def test_presenting_without_evidence_ignored(self, auth_headers):
        body = {
            "diffKey": "medium", "round": 3, "suspicion": 40,
            "playerMsg": "I present this seal that proves my innocence.",
            "history": [], "evidence": [],  # NO evidence granted
        }
        r = requests.post(f"{API}/trial/turn", json=body, headers=auth_headers, timeout=90)
        assert r.status_code == 200
        d = r.json()
        assert d["isPresenting"] is False
        assert d["presentedEvidence"] is None


# ═══ SAVE / LOAD / DELETE ═══
class TestSaveLoad:
    def test_save_current_delete(self, auth_headers):
        # Clean first
        requests.delete(f"{API}/trial/current", headers=auth_headers, timeout=15)

        save_body = {"diffKey": "medium", "round": 3, "suspicion": 45, "mood": "thoughtful",
                     "history": [{"round": 1, "player": "hello", "sultan": "hi", "qazi": "ha"}],
                     "evidence": [], "courtLogs": [], "chatLog": []}
        r = requests.post(f"{API}/trial/save", json=save_body, headers=auth_headers, timeout=15)
        assert r.status_code == 200
        assert r.json()["ok"] is True

        r = requests.get(f"{API}/trial/current", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        loaded = r.json()
        assert loaded is not None
        assert loaded["round"] == 3
        assert loaded["suspicion"] == 45
        assert loaded["diffKey"] == "medium"

        r = requests.delete(f"{API}/trial/current", headers=auth_headers, timeout=15)
        assert r.status_code == 200

        r = requests.get(f"{API}/trial/current", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        assert r.json() is None


# ═══ COMPLETE + STATS ═══
class TestCompleteStats:
    def test_complete_and_stats(self, auth_headers):
        # Baseline stats
        r0 = requests.get(f"{API}/stats", headers=auth_headers, timeout=15)
        assert r0.status_code == 200
        prev_total = r0.json()["total"]
        prev_wins = r0.json()["wins"]

        r = requests.post(f"{API}/trial/complete", json={
            "diffKey": "medium", "ruler": "Muhammad bin Tughlaq", "result": "win",
            "rounds": 6, "finalSuspicion": 0}, headers=auth_headers, timeout=15)
        assert r.status_code == 200

        r = requests.get(f"{API}/stats", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        s = r.json()
        assert s["total"] == prev_total + 1
        assert s["wins"] == prev_wins + 1
        assert isinstance(s["history"], list)
        assert s["history"][0]["result"] == "win"
