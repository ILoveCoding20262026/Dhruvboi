import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import api from "./api";
import { DIFFS } from "./gameData";

const GameContext = createContext(null);
export const useGame = () => useContext(GameContext);

let MSG_ID = 0;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const freshState = {
  diffKey: null,
  round: 1,
  suspicion: 40,
  mood: "neutral",
  history: [],
  evidence: [],
  courtLogs: [],
};

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("cover");
  const [game, setGame] = useState({ ...freshState });
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStatus, setThinkingStatus] = useState("");
  const [endingKey, setEndingKey] = useState(null);
  const [lastDelta, setLastDelta] = useState(null);
  const [hasNewEvidence, setHasNewEvidence] = useState(false);
  const gameRef = useRef(game);
  gameRef.current = game;

  const goto = useCallback((s) => setScreen(s), []);

  const addMessage = useCallback((type, who, body, animate = true) => {
    const id = ++MSG_ID;
    setMessages((m) => [...m, { id, type, who, body, animate }]);
    return id;
  }, []);

  const resetGame = useCallback(() => {
    setGame({ ...freshState });
    setMessages([]);
    setEndingKey(null);
    setLastDelta(null);
  }, []);

  const selectDiff = useCallback((key) => {
    const d = DIFFS[key];
    setGame({
      diffKey: key, round: 1, suspicion: d.start, mood: "neutral",
      history: [], evidence: [], courtLogs: [],
    });
    setMessages([]);
    setEndingKey(null);
    setLastDelta(null);
    setScreen("cinematic");
  }, []);

  const startGame = useCallback(() => {
    setMessages([{ id: ++MSG_ID, type: "system", who: "", body: "The court is assembled. The Sultan waits upon his throne. Speak, Farrukh.", animate: false }]);
    setScreen("game");
  }, []);

  const saveGame = useCallback(async (stateOverride) => {
    const g = stateOverride || gameRef.current;
    if (!g.diffKey) return;
    try {
      await api.post("/trial/save", {
        diffKey: g.diffKey, round: g.round, suspicion: g.suspicion, mood: g.mood,
        history: g.history, evidence: g.evidence, courtLogs: g.courtLogs, chatLog: [],
      });
    } catch (e) { /* non-blocking */ }
  }, []);

  const continueTrial = useCallback(async () => {
    try {
      const { data } = await api.get("/trial/current");
      if (!data || !data.diffKey) return false;
      setGame({
        diffKey: data.diffKey, round: data.round, suspicion: data.suspicion,
        mood: data.mood || "neutral", history: data.history || [],
        evidence: data.evidence || [], courtLogs: data.courtLogs || [],
      });
      setMessages([{ id: ++MSG_ID, type: "system", who: "",
        body: `The trial resumes — Round ${data.round}. Speak, Farrukh.`, animate: false }]);
      setEndingKey(null);
      setScreen("game");
      return true;
    } catch { return false; }
  }, []);

  const cycleThinking = useRef(null);
  const startThinking = () => {
    setIsThinking(true);
    const statuses = [
      "QAZI IBRAHIM PREPARES HIS ATTACK", "THE SULTAN LISTENS…",
      "THE COURT WEIGHS YOUR WORDS…", "THE SULTAN FORMULATES HIS RESPONSE…",
      "THE ULEMAS MURMUR AMONGST THEMSELVES…",
    ];
    let i = 0;
    setThinkingStatus(statuses[0]);
    cycleThinking.current = setInterval(() => {
      i = (i + 1) % statuses.length;
      setThinkingStatus(statuses[i]);
    }, 4000);
  };
  const stopThinking = () => {
    setIsThinking(false);
    if (cycleThinking.current) { clearInterval(cycleThinking.current); cycleThinking.current = null; }
  };

  // duration to let a typewriter message finish (ms)
  const typeDuration = (text) => Math.min(2600, 250 + (text?.length || 0) * 11);

  const sendTurn = useCallback(async (msg) => {
    const g = gameRef.current;
    if (!msg || isThinking) return;
    addMessage("player", "FARRUKH (YOU)", msg, false);
    startThinking();
    try {
      const { data } = await api.post("/trial/turn", {
        diffKey: g.diffKey, round: g.round, suspicion: g.suspicion,
        playerMsg: msg, history: g.history, evidence: g.evidence,
      });
      stopThinking();

      // Reveal sequence (mirrors original ordering)
      if (data.isPresenting && data.presentedEvidence) {
        const pe = data.presentedEvidence;
        addMessage("system", "", `${pe.icon || "◆"} EVIDENCE PRESENTED — [${(pe.label || pe.type).toUpperCase()}] — "${pe.text}"`, false);
        await wait(500);
      }

      addMessage("sultan", g.diffKey ? DIFFS[g.diffKey].ruler.toUpperCase() : "THE SULTAN", data.sultanSpeech);
      await wait(typeDuration(data.sultanSpeech) + 300);

      addMessage("qazi", "QAZI IBRAHIM", data.qaziText);
      await wait(typeDuration(data.qaziText) + 200);

      if (data.newEvidence) {
        addMessage("system", "", `📜 New evidence secured — open EVIDENCE to read it. Say "I present this evidence" to bring it before the Sultan.`, false);
        setHasNewEvidence(true);
        setTimeout(() => setHasNewEvidence(false), 5000);
        await wait(400);
      }

      addMessage("ulema", "THE ULEMAS", data.ulemaText);
      await wait(typeDuration(data.ulemaText) + 200);

      addMessage("citizen", "THE CROWD", data.citizenLine, false);
      await wait(300);

      if (data.dramaticEvent) addMessage("dramatic", "", `— ${data.dramaticEvent} —`, false);

      // delta cue
      setLastDelta({ value: data.newSuspicion - data.prevSuspicion, id: ++MSG_ID });

      // Update state
      const newEvidence = data.newEvidence ? [...g.evidence, data.newEvidence] : g.evidence;
      const newHistory = [...g.history, { round: g.round, player: msg, sultan: data.sultanSpeech || "", qazi: data.qaziText || "" }];
      const updated = {
        ...g,
        suspicion: data.newSuspicion,
        mood: data.mood || "neutral",
        history: newHistory,
        evidence: newEvidence,
        courtLogs: Array.isArray(data.courtLog) && data.courtLog.length ? data.courtLog : g.courtLogs,
        round: g.round + 1,
      };
      setGame(updated);

      if (data.ending) {
        const d = DIFFS[g.diffKey];
        const result = data.ending === d.winKey ? "win" : "lose";
        api.post("/trial/complete", {
          diffKey: g.diffKey, ruler: d.ruler, result,
          rounds: g.round, finalSuspicion: data.newSuspicion,
        }).catch(() => {});
        setTimeout(() => { setEndingKey(data.ending); setScreen("ending"); }, 1600);
      } else {
        saveGame(updated);
      }
    } catch (err) {
      stopThinking();
      const detail = err?.response?.data?.detail || err.message;
      addMessage("system", "", `⚠ The court scribe stumbles — ${detail}. Please speak again.`, false);
    }
  }, [isThinking, addMessage, saveGame]);

  return (
    <GameContext.Provider value={{
      screen, goto, game, setGame, messages, isThinking, thinkingStatus,
      endingKey, lastDelta, hasNewEvidence,
      resetGame, selectDiff, startGame, sendTurn, continueTrial, saveGame,
    }}>
      {children}
    </GameContext.Provider>
  );
}
