import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useGame } from "@/game/GameContext";
import api from "@/game/api";
import { toast } from "sonner";

export default function CoverScreen() {
  const { user, logout } = useAuth();
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
      <div className="account-chip">
        <span>{user?.name || user?.email}</span>
        <button data-testid="logout-btn" onClick={logout}>LEAVE</button>
      </div>
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
        <button className="cover-nav-btn disabled" data-testid="multiplayer-btn"
          onClick={() => toast("Multiplayer arrives in a future decree.")}>
          👥 MULTIPLAYER — SOON
        </button>
      </div>

      <div className="cover-footer">DELHI · 13TH CENTURY CE · AI-POWERED</div>
    </div>
  );
}
