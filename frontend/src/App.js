import React from "react";
import "@/index.css";
import { Toaster } from "sonner";
import { GameProvider, useGame } from "@/game/GameContext";

import CoverScreen from "@/screens/CoverScreen";
import RulesScreen from "@/screens/RulesScreen";
import ChooseSultanScreen from "@/screens/ChooseSultanScreen";
import CinematicScreen from "@/screens/CinematicScreen";
import TrialScreen from "@/screens/TrialScreen";
import EndingScreen from "@/screens/EndingScreen";

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

export default function App() {
  return (
    <>
      <Toaster theme="dark" position="top-center" toastOptions={{
        style: { background: "#0f0a06", border: "1px solid #c9a84c", color: "#e8d5b0", fontFamily: "'IM Fell English', serif" },
      }} />
      <GameProvider>
        <GameScreens />
      </GameProvider>
    </>
  );
}
