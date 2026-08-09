import React, { useState } from "react";
import { useGame } from "@/game/GameContext";
import { DIFFS } from "@/game/gameData";

const DIFF_KEYS = ["waytooasy", "cakewalk", "easy", "medium", "hard", "extreme", "impossible"];

export default function ChooseSultanScreen() {
  const { goto, selectDiff } = useGame();
  const [idx, setIdx] = useState(0);
  const keys = DIFF_KEYS;
  const d = DIFFS[keys[idx]];

  const good = d.farukhMult / d.qaziMult;
  const bad = d.qaziMult / d.farukhMult;
  const totalVal = good - bad;
  const totalW = totalVal.toFixed(3);
  const totalColor = totalVal > 0.001 ? "#4a9e5c" : totalVal < -0.001 ? "#c04040" : "#c9a84c";
  const totalLabel = totalVal > 0.001 ? "(favourable)" : totalVal < -0.001 ? "(against you)" : "(neutral)";

  const prev = () => setIdx((idx - 1 + keys.length) % keys.length);
  const next = () => setIdx((idx + 1) % keys.length);

  return (
    <div id="screen-diff" className="screen active"
      style={{ background: "radial-gradient(ellipse at 50% 25%,#160a04,var(--dark))", padding: "30px 16px", justifyContent: "center" }}
      data-testid="choose-sultan-screen">
      <h2 className="diff-title">CHOOSE YOUR SULTAN</h2>
      <p className="diff-subtitle">Each ruler judges by different laws of mercy and cruelty.</p>
      <div className="diff-carousel">
        <div className="diff-timeline">
          {keys.map((k, i) => {
            const dd = DIFFS[k];
            const isLast = i === keys.length - 1;
            return (
              <div className="diff-tl-step" key={k}>
                <div className="diff-tl-wrap">
                  <div className={`diff-tl-dot ${i === idx ? "active" : i < idx ? "visited" : ""}`}
                    style={{ "--tl-color": dd.color }} onClick={() => setIdx(i)} data-testid={`sultan-dot-${k}`}></div>
                  <div className={`diff-tl-label ${i === idx ? "active" : ""}`} style={i === idx ? { color: dd.color } : {}}>
                    {dd.tier.split(" ").slice(-1)[0]}
                  </div>
                </div>
                {!isLast && <div className={`diff-tl-line ${i < idx ? "done" : ""}`} style={{ marginBottom: 16 }}></div>}
              </div>
            );
          })}
        </div>

        <div className="diff-card-wrap">
          <div className="diff-card" style={{ "--dc": d.color }} data-testid="sultan-card">
            <div className="dc-tier" style={{ color: d.color }}>{d.tier}</div>
            <div className="dc-name">{d.ruler}</div>
            <div className="dc-era">{d.era}</div>
            <p className="dc-desc">"{d.desc}"</p>
            <div className="dc-stat">⚖ Starting suspicion: {d.start}%</div>
            <div className="dc-stat" style={{ color: "#d94040" }}>👁 Qazi's weight: {d.qaziMult}×</div>
            <div className="dc-stat" style={{ color: "#4a9e5c" }}>🛡 Farrukh's weight: {d.farukhMult}×</div>
            <div className="dc-stat" style={{ color: "#4a9e5c" }}>✦ Good: {good.toFixed(3)}×</div>
            <div className="dc-stat" style={{ color: "#d94040" }}>✗ Bad: {bad.toFixed(3)}×</div>
            <div className="dc-stat" style={{ color: totalColor, borderTop: "1px solid #2e1e08", marginTop: 5, paddingTop: 5 }}>⚡ Total: {totalW} {totalLabel}</div>
            <div className="dc-avgr">⏱ Avg rounds to beat: {d.avgRounds}</div>
            <div className="dc-div"></div>
            <div className="dc-win">🏆 {d.win}</div>
            <div className="dc-lose">💀 {d.lose}</div>
          </div>
        </div>

        <div className="diff-nav">
          <button className="btn-diff-nav" data-testid="sultan-prev-btn" onClick={prev}>← BACK</button>
          <button className="btn-diff-enter" data-testid="sultan-enter-btn" onClick={() => selectDiff(d.key)}>ENTER COURT</button>
          <button className="btn-diff-nav" data-testid="sultan-next-btn" onClick={next}>NEXT →</button>
        </div>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: 9, letterSpacing: 3, color: "#2e1e08", marginTop: 10, textAlign: "center" }}>{idx + 1} OF {keys.length}</div>
        <button className="btn-diff-nav" style={{ marginTop: 18 }} data-testid="rules-back-btn" onClick={() => goto("rules")}>← RULES</button>
      </div>
    </div>
  );
}
