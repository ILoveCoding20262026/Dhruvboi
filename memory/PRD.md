# Delhi Sultanate Court — PRD

## Original Problem Statement
Migrate an AI-powered courtroom defense game ("Defend Yourself in the Delhi Sultanate") from a single HTML file to React + FastAPI + MongoDB. Player is Farrukh, falsely accused of stealing 10,000 gold dinars, arguing before an AI Sultan while Qazi Ibrahim prosecutes. Suspicion 0% = freedom, 100% = condemned. Preserve hand-tuned balance and all visuals EXACTLY. Add: robust AI JSON handling, secure backend AI proxy, user accounts (JWT + Google), save/load, evidence cards, witness AI, and multiplayer.

## User Choices
- AI: Claude Sonnet 4.6 via Emergent Universal LLM key
- Auth: Email+password JWT **and** Google login (Emergent OAuth)
- First iteration scope: Solo trial core (migration + game loop + accounts + save/load + AI proxy)
- Aesthetic: authentic medieval Delhi Sultanate

## Architecture
- **Frontend** React (CRA + craco, `@/` alias). State-driven screens (cover/rules/diff/cinematic/game/ending). Verbatim ports: `game/gameData.js` (DIFFS, ENDINGS, EVIDENCE_TYPES, CROWD, INTRO_STEPS, buildEndingScene), `game/courtScenes.js` (buildCourtSVG, buildIntroSVG), `game/court.css`. Auth via Bearer token in localStorage (`dsc_token`).
- **Backend** FastAPI. `server.py` (auth, Claude proxy, trial turn, save/load, stats), `sultans.py` (balance data + prompts + EXACT suspicion formula). Claude via emergentintegrations (`claude-sonnet-4-6`).
- **DB** MongoDB: users, sessions (Google), saves, matches.

## Balance (PRESERVED VERBATIM — do not change)
`goodWeight = farukhMult/qaziMult`, `badWeight = qaziMult/farukhMult`; `effDelta = rawDelta*goodWeight if rawDelta<0 else rawDelta*badWeight`; `newSuspicion = clamp(0,100, round(suspicion+effDelta))`. Per-Sultan start/qaziMult/farukhMult unchanged. Evidence surfaces on even rounds. Presentation is exploit-proof (only granted evidence + explicit keyword).

## Implemented (2026-06)
- ✅ Full React migration of all screens, SVG court scenes, GSAP intro/ending cinematics, suspicion meter, evidence modal, options modal
- ✅ FastAPI Claude proxy with robust JSON recovery (S1–S7 strategies) + retries + safe fallback
- ✅ JWT email/password auth (Google login **removed** — kept simple per user request)
- ✅ Game loop `/api/trial/turn` (Sultan JSON + speech, Qazi, Ulema, Crowd, evidence gen) with exact balance
- ✅ Auto-save each round + "Continue Trial", match history + win/loss stats
- ✅ Suspicion delta cue, thinking indicator (interval cleaned up), evidence cards UI
- ✅ **Witness AI & interrogation rounds** — every 3rd round a witness (clerk→guard→merchant) takes the stand; player interrogates (`/api/trial/witness/ask`), Qazi cross-examines and Sultan weighs testimony (`/api/trial/witness/resolve`); mandatory (cannot skip); testimony feeds into history/Sultan context; same balance weighting; evidence still granted on even rounds
- ✅ Tested: 25/25 backend, 100% frontend (iterations 1–3)

## Backlog (not yet built)
- **P1 Multiplayer** — WebSocket rooms, 1v1 Duel (human Qazi), Co-op Defense, lobby codes, turn timers
- **P2** — chat log virtualization for very long trials, streaming (SSE) sultan speech, richer stats/profile page, audio unlock + ambient court murmur

## Next Tasks
Multiplayer, built incrementally (WebSocket + lobby → 1v1 → Co-op → timers).
