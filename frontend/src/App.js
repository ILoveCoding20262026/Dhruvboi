import React, { useEffect, useRef, useState } from "react";
import "@/index.css";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { GameProvider, useGame } from "@/game/GameContext";
import api from "@/game/api";

import AuthScreen from "@/screens/AuthScreen";
import CoverScreen from "@/screens/CoverScreen";
import RulesScreen from "@/screens/RulesScreen";
import ChooseSultanScreen from "@/screens/ChooseSultanScreen";
import CinematicScreen from "@/screens/CinematicScreen";
import TrialScreen from "@/screens/TrialScreen";
import EndingScreen from "@/screens/EndingScreen";

function GoogleCallback() {
  const { applyToken } = useAuth();
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const hash = window.location.hash;
    const sid = new URLSearchParams(hash.replace("#", "")).get("session_id");
    (async () => {
      try {
        const { data } = await api.post("/auth/google/session", { session_id: sid });
        applyToken(data.token, data.user);
      } catch { /* fall through to login */ }
      window.history.replaceState(null, "", window.location.pathname);
      window.location.hash = "";
    })();
  }, [applyToken]);
  return <div className="loading-court">ENTERING THE COURT…</div>;
}

function GameScreens() {
  const { screen } = useGame();
  switch (screen) {
    case "cover": return <CoverScreen />;
    case "rules": return <RulesScreen />;
    case "diff": return <ChooseSultanScreen />;
    case "cinematic": return <CinematicScreen />;
    case "game": return <TrialScreen />;
    case "ending": return <EndingScreen />;
    default: return <CoverScreen />;
  }
}

function Shell() {
  const { user, loading } = useAuth();
  const [isCallback] = useState(() => window.location.hash?.includes("session_id="));

  if (isCallback) return <GoogleCallback />;
  if (loading) return <div className="loading-court">◆ ◆ ◆</div>;
  if (!user) return <AuthScreen />;

  return (
    <GameProvider>
      <GameScreens />
    </GameProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster theme="dark" position="top-center" toastOptions={{
        style: { background: "#0f0a06", border: "1px solid #c9a84c", color: "#e8d5b0", fontFamily: "'IM Fell English', serif" },
      }} />
      <Shell />
    </AuthProvider>
  );
}
