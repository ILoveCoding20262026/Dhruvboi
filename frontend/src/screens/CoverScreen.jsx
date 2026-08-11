import React, { useEffect, useState } from "react";
import { useGame } from "@/game/GameContext";
import api from "@/game/api";
import { toast } from "sonner";

export default function CoverScreen() {
  const { goto, resetGame, continueTrial } = useGame();
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    api.get("/trial/current").then(({ data }) => setHasSave(!!(data && data.diffKey))).catch(() => {});
  }, []);

  const onContinue = async () => {
    const ok = await continueTrial();
    if (!ok) toast("No trial in progress to continue.");
  };

  return (
    <div id="screen-cover" className="screen active" style={{ opacity: 1 }} data-testid="cover-screen">
      <div className="cover-moon">🌙</div>
      <h1 className="cover-title">DEFEND YOURSELF<br />IN THE DELHI<br />SULTANATE</h1>
      <div className="cover-sub">A DELHI SULTANATE TRIAL</div>
      <div className="cover-divider"></div>
      <p className="cover-lore">
        You are Farrukh — an innocent treasury clerk accused of stealing 10,000 gold dinars.
        Defend yourself before the Sultan, or face his justice.
      </p>

      <div className="cover-nav">
        {hasSave && (
          <button className="cover-nav-btn primary" data-testid="continue-trial-btn" onClick={onContinue}>
            ▶ CONTINUE TRIAL
          </button>
        )}
        <button className={`cover-nav-btn ${hasSave ? "" : "primary"}`} data-testid="new-trial-btn"
          onClick={() => { resetGame(); goto("rules"); }}>
          ⚔ NEW SOLO TRIAL
        </button>
      </div>

      <div className="cover-footer">DELHI · 13TH CENTURY CE · AI-POWERED</div>
    </div>
  );
}
