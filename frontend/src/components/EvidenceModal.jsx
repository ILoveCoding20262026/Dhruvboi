import React from "react";
import { useGame } from "@/game/GameContext";
import { EVIDENCE_TYPES } from "@/game/gameData";

export default function EvidenceModal({ open, onClose, selected, setSelected }) {
  const { game } = useGame();
  if (!open) return null;
  const evidence = game.evidence || [];
  const sel = selected != null ? evidence[selected] : null;
  const selType = sel ? EVIDENCE_TYPES.find((t) => t.type === sel.type) : null;

  return (
    <div className="modal-overlay open" id="evidence-modal" data-testid="evidence-modal"
      onClick={(e) => { if (e.target.id === "evidence-modal") onClose(); }}>
      <div className="modal-box">
        <div className="modal-title">📜 EVIDENCE</div>
        <div className="e-chart-label">ROLL CHANCES THIS TRIAL</div>
        <div id="e-chart">
          {EVIDENCE_TYPES.map((e) => (
            <div className="e-row" key={e.type}>
              <div className="e-icon">{e.icon}</div>
              <div className="e-name" style={{ color: e.color }}>{e.label}</div>
              <div className="e-bar-wrap"><div className="e-bar" style={{ width: `${e.weight * 3.6}%`, background: e.barColor }}></div></div>
              <div className="e-pct">{e.weight}%</div>
            </div>
          ))}
        </div>
        <div className="e-collected-title">◆ COLLECTED</div>
        <div className="e-chips" id="e-chips">
          {evidence.length === 0
            ? <span style={{ fontSize: 12, color: "#3e2e18", fontStyle: "italic" }}>No evidence yet — surfaces every 2 rounds.</span>
            : evidence.map((e, i) => {
              const et = EVIDENCE_TYPES.find((t) => t.type === e.type);
              return (
                <div className={`e-chip ${e.type}`} key={i} data-testid={`evidence-chip-${i}`} onClick={() => setSelected(i)}>
                  {et?.icon || "◆"} {e.type.toUpperCase()} <span style={{ fontSize: 9, color: "#5a4030", fontFamily: "Cinzel,serif" }}>R{e.round}</span>
                </div>
              );
            })}
        </div>
        {sel && (
          <div className="e-detail" style={{ display: "block", borderColor: selType?.barColor || "#2e1e08" }}>
            <div className="e-detail-type" style={{ color: selType?.color || "#c9a84c" }}>{selType?.icon || "◆"} {(sel.label || sel.type).toUpperCase()}</div>
            <div className="e-detail-text">{sel.text}</div>
            <div className="e-detail-round">{selType?.quote || ""} — Surfaced in Round {sel.round}</div>
          </div>
        )}
        <button className="btn-close" data-testid="evidence-close-btn" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  );
}
