import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGame } from "@/game/GameContext";
import { useAuth } from "@/context/AuthContext";
import { DIFFS } from "@/game/gameData";
import { buildCourtSVG } from "@/game/courtScenes";
import api from "@/game/api";
import Typewriter from "@/components/Typewriter";
import EvidenceModal from "@/components/EvidenceModal";

function meterView(pct) {
  const color = pct <= 20 ? "#4a9e5c" : pct <= 45 ? "#8bc34a" : pct <= 65 ? "#e6ac00" : pct <= 80 ? "#d4872a" : "#c04040";
  const label = pct <= 20 ? "CREDIBLE" : pct <= 40 ? "UNCERTAIN" : pct <= 60 ? "SUSPICIOUS" : pct <= 80 ? "LIKELY GUILTY" : "CONDEMNED";
  const frameCls = "bottom-meter-inner" + (pct <= 18 ? " green" : pct >= 80 ? " red" : "");
  return { color, label, frameCls };
}

export default function TrialScreen() {
  const { game, setGame, messages, isThinking, thinkingStatus, sendTurn, goto, selectDiff, saveGame, resetGame, lastDelta, hasNewEvidence } = useGame();
  const { logout } = useAuth();
  const [input, setInput] = useState("");
  const [evOpen, setEvOpen] = useState(false);
  const [evSel, setEvSel] = useState(null);
  const [optOpen, setOptOpen] = useState(false);
  const [logOn, setLogOn] = useState(true);
  const chatRef = useRef(null);

  const d = game.diffKey ? DIFFS[game.diffKey] : DIFFS.medium;
  const courtSVG = useMemo(() => buildCourtSVG(d, game.mood), [d, game.mood]);
  const mv = meterView(game.suspicion);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isThinking]);

  const submit = () => {
    const msg = input.trim();
    if (!msg || isThinking) return;
    setInput("");
    sendTurn(msg);
  };

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } };

  const abandon = async () => {
    setOptOpen(false);
    try { await api.delete("/trial/current"); } catch {}
    resetGame();
    goto("cover");
  };

  const skipRound = () => {
    setOptOpen(false);
    setGame({ ...game, round: game.round + 1 });
  };

  return (
    <div id="screen-game" className="screen active" data-testid="trial-screen">
      <div className="game-layout">
        <div className="topbar">
          <div className="tb-round" data-testid="round-indicator">ROUND {game.round}</div>
          <div className="tb-ruler">{d.ruler.toUpperCase()}</div>
          <button className="tb-opts" data-testid="options-btn" onClick={() => setOptOpen(true)}>☰ OPTIONS</button>
        </div>

        <div className="game-main">
          <div className="court-wrap" id="court-wrap">
            <div id="court-svg-wrap" style={{ position: "absolute", inset: 0, zIndex: 0 }} dangerouslySetInnerHTML={{ __html: courtSVG }} />
            {logOn && game.courtLogs?.length > 0 && (
              <div className="float-log" style={{ display: "block" }}>
                <div className="float-log-inner">
                  <div className="float-log-title">◆ ROUND {game.round - 1}</div>
                  <div>{game.courtLogs.map((l, i) => <div className="float-log-item" key={i}>{l}</div>)}</div>
                </div>
              </div>
            )}
            {lastDelta && lastDelta.value !== 0 && (
              <DeltaFloat key={lastDelta.id} value={lastDelta.value} />
            )}
          </div>

          <div className="chat-wrap">
            <div className="chat-box" id="chat-box" ref={chatRef} data-testid="chat-box">
              {messages.map((m) => (
                <div className={`msg ${m.type}`} key={m.id}>
                  {m.who && <div className="msg-who">{m.who}</div>}
                  <div className="msg-body" style={{ whiteSpace: "pre-wrap" }}>
                    {m.animate ? <Typewriter text={m.body} /> : m.body}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="thinking" data-testid="thinking-indicator">
                  <div className="thinking-label">{thinkingStatus}</div>
                  <div className="thinking-dots"><span>◆</span><span>◆</span><span>◆</span></div>
                </div>
              )}
            </div>
            <div className="chat-input-row">
              <input className="chat-input" data-testid="chat-input" value={input} disabled={isThinking}
                placeholder={isThinking ? "The court deliberates…" : "Speak your defence, Farrukh..."}
                maxLength={400} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} />
              <button className="btn-speak" data-testid="speak-btn" disabled={isThinking} onClick={submit}>SPEAK</button>
            </div>
          </div>

          <div className="bottom-bar">
            <button className={`btn-evidence-bottom${hasNewEvidence ? " has-new" : ""}`} data-testid="evidence-btn"
              onClick={() => { setEvSel(null); setEvOpen(true); }}>
              📜 EVIDENCE <span className="ev-badge" data-testid="evidence-count">{game.evidence?.length || 0}</span>
            </button>
            <div className="bottom-meter">
              <div className={mv.frameCls} id="meter-frame" data-testid="suspicion-meter">
                <span className="bm-label">⚖</span>
                <div className="bm-gems">
                  {["✦", "☽", "◆", "☽", "✦"].map((s, i) => (
                    <span key={i} style={{ color: game.suspicion >= i * 25 ? mv.color : "#2e1e08", fontSize: 8, fontFamily: "Cinzel,serif", transition: "color .4s" }}>{s}</span>
                  ))}
                </div>
                <div className="bm-track">
                  <div className="bm-fill" style={{ width: `${game.suspicion}%`, background: `linear-gradient(90deg,#4a9e5c,${mv.color})`, boxShadow: `0 0 6px ${mv.color}55` }}></div>
                  <span className="bm-text">{mv.label}</span>
                </div>
                <span className="bm-pct" style={{ color: mv.color }} data-testid="suspicion-pct">{game.suspicion}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EvidenceModal open={evOpen} onClose={() => setEvOpen(false)} selected={evSel} setSelected={setEvSel} />

      {optOpen && (
        <div className="modal-overlay open" id="options-modal" data-testid="options-modal"
          onClick={(e) => { if (e.target.id === "options-modal") setOptOpen(false); }}>
          <div className="modal-box">
            <div className="modal-title">OPTIONS</div>
            <div className="opt-row">
              <span className="opt-label">Court Log</span>
              <button className={`toggle ${logOn ? "on" : "off"}`} data-testid="log-toggle" onClick={() => setLogOn(!logOn)}></button>
            </div>
            <div className="opt-row" style={{ border: "none" }}>
              <span className="opt-note">Suspicion 0% = free. Suspicion 100% = condemned. No round limit.</span>
            </div>
            <div className="opt-btns">
              <button className="btn-opt" onClick={() => { setOptOpen(false); goto("diff"); }}>⚔ Change Sultan</button>
              <button className="btn-opt" onClick={() => { setOptOpen(false); selectDiff(game.diffKey); }}>↺ Restart Trial</button>
              <button className="btn-opt" onClick={skipRound}>⏭ Skip Round</button>
              <button className="btn-opt danger" data-testid="abandon-btn" onClick={abandon}>✕ Abandon</button>
              <button className="btn-opt primary" data-testid="resume-btn" onClick={() => setOptOpen(false)}>▶ Resume</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DeltaFloat({ value }) {
  const up = value < 0; // suspicion down = good = green
  const color = up ? "#4a9e5c" : "#c04040";
  const sign = value > 0 ? "+" : "";
  return (
    <div className="delta-float" style={{ color, animation: "deltaRise 1.6s ease forwards" }}>
      {sign}{value}%
    </div>
  );
}
