import React from "react";
import { useGame } from "@/game/GameContext";

export default function RulesScreen() {
  const { goto } = useGame();
  return (
    <div id="screen-rules" className="screen active" data-testid="rules-screen">
      <h2 className="rules-title">THE RULES OF COURT</h2>
      <p className="rules-sub">READ BEFORE YOU ENTER</p>
      <div className="rules-wrap">
        <div className="rules-highlight">
          <div className="rules-highlight-text">
            Suspicion reaches <span style={{ color: "#4a9e5c" }}>0%</span> — you walk free &nbsp;|&nbsp; Suspicion reaches <span style={{ color: "#c04040" }}>100%</span> — you are condemned<br />
            <span style={{ fontSize: 11, opacity: 0.65, letterSpacing: 2 }}>NO ROUND LIMIT — THE TRIAL ENDS ONLY WHEN ONE IS REACHED</span>
          </div>
        </div>

        <div className="rules-section">
          <div className="rules-section-title">⚖ THE COURT</div>
          <div className="rules-grid">
            <div className="rules-card"><div className="rules-card-icon">👑</div><div className="rules-card-title">THE SULTAN</div><div className="rules-card-body">The judge. He delivers his verdict each round — a full paragraph in character. His mood shifts based on how you argue. His face on the throne changes with his mood.</div></div>
            <div className="rules-card"><div className="rules-card-icon">⚔</div><div className="rules-card-title">QAZI IBRAHIM</div><div className="rules-card-body">The prosecutor. He has no evidence of his own — he can only attack your statements and poke holes in your defence. The better you argue, the less he has to work with.</div></div>
            <div className="rules-card"><div className="rules-card-icon">📖</div><div className="rules-card-title">THE ULEMAS</div><div className="rules-card-body">Islamic scholars seated left. They react simply to what you say — no law quotes, just honest human reactions. Watch them to gauge how the room feels.</div></div>
            <div className="rules-card"><div className="rules-card-icon">👥</div><div className="rules-card-title">THE CROWD</div><div className="rules-card-body">Citizens assembled to witness the trial. They shout one-line reactions — raw, unfiltered. They can't change the verdict but they set the atmosphere.</div></div>
          </div>
        </div>

        <div className="rules-section">
          <div className="rules-section-title">🗣 HOW TO PLAY</div>
          <ul className="rules-list">
            <li>Type your defence in the chat box at the bottom and press <strong style={{ color: "var(--gold)", fontStyle: "normal" }}>SPEAK</strong>.</li>
            <li>Every round, the Sultan, Qazi Ibrahim, and Ulemas all respond to what you said.</li>
            <li>Your argument quality directly affects the <strong style={{ color: "var(--gold)", fontStyle: "normal" }}>baseDelta</strong> — how much suspicion changes each round.</li>
            <li>On <strong style={{ color: "var(--gold)", fontStyle: "normal" }}>even rounds</strong> (2, 4, 6…), a random piece of evidence is secretly added to your collection — open <strong style={{ color: "var(--gold)", fontStyle: "normal" }}>EVIDENCE</strong> to see it.</li>
            <li><strong style={{ color: "var(--gold)", fontStyle: "normal" }}>Evidence does nothing</strong> until you present it. Mention it explicitly in your argument — the court will examine it that round.</li>
            <li>The Sultan <strong style={{ color: "var(--gold)", fontStyle: "normal" }}>ignores</strong> any evidence you merely claim — you must reference what is actually in your collection.</li>
            <li>Qazi Ibrahim listens to no one but can only use your own words against you.</li>
          </ul>
        </div>

        <div className="rules-section">
          <div className="rules-section-title">👁 DIFFICULTY EXPLAINED</div>
          <ul className="rules-list">
            <li><strong style={{ color: "var(--gold)", fontStyle: "normal" }}>Starting Suspicion</strong> — where the meter begins. Higher = you're already in trouble before you speak.</li>
            <li><strong style={{ color: "var(--gold)", fontStyle: "normal" }}>Judgment Weight</strong> — multiplies how much suspicion changes each round. Higher = bigger swings both ways.</li>
            <li><strong style={{ color: "var(--gold)", fontStyle: "normal" }}>Qazi's Weight</strong> — multiplies how much suspicion rises when your argument is weak. Higher = Qazi's attacks hurt far more.</li>
            <li><strong style={{ color: "var(--gold)", fontStyle: "normal" }}>Average Rounds</strong> — roughly how many rounds it takes a skilled player to win. Not a limit — just a guide.</li>
          </ul>
        </div>

        <button className="btn-rules-next" data-testid="rules-next-btn" onClick={() => goto("diff")}>CHOOSE YOUR SULTAN →</button>
      </div>
    </div>
  );
}
