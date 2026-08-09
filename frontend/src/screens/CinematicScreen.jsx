import React, { useEffect, useRef, useState } from "react";
import { useGame } from "@/game/GameContext";
import { INTRO_STEPS } from "@/game/gameData";
import { buildIntroSVG } from "@/game/courtScenes";

const SCENE_DUR = 5500;

export default function CinematicScreen() {
  const { startGame } = useGame();
  const [step, setStep] = useState(0);
  const timer = useRef(null);
  const progRef = useRef(null);

  const armTimer = (i) => {
    clearTimeout(timer.current);
    if (progRef.current) {
      progRef.current.style.transition = "none";
      progRef.current.style.width = "0%";
      setTimeout(() => {
        if (progRef.current) {
          progRef.current.style.transition = `width ${SCENE_DUR}ms linear`;
          progRef.current.style.width = "100%";
        }
      }, 50);
    }
    timer.current = setTimeout(() => {
      if (i + 1 < INTRO_STEPS.length) setStep(i + 1);
      else startGame();
    }, SCENE_DUR);
  };

  useEffect(() => { armTimer(step); return () => clearTimeout(timer.current); }, [step]);

  const s = INTRO_STEPS[step];

  return (
    <div id="screen-cinematic" className="screen active" data-testid="cinematic-screen">
      <div className="cinema-wrap">
        <div className="letterbox top"></div>
        <div className="letterbox bottom"></div>
        <div id="cinema-scenes">
          {INTRO_STEPS.map((st, i) => (
            <div className={`cinema-scene${i === step ? " visible" : ""}`} key={i}>
              <div className="kb-wrap"><div className={`kb-inner ${st.kb}`} dangerouslySetInnerHTML={{ __html: buildIntroSVG(i) }} /></div>
            </div>
          ))}
        </div>
        <div className="cinema-text">
          <div className="cinema-num">SCENE {step + 1} OF {INTRO_STEPS.length}</div>
          <div className="cinema-title" key={`t${step}`}>{s.title}</div>
          <div className="cinema-body" key={`b${step}`}>{s.body}</div>
        </div>
        <div className="cinema-progress-wrap">
          <div className="cinema-dots">
            {INTRO_STEPS.map((_, i) => (
              <div className={`cinema-dot${i === step ? " active" : ""}`} key={i} onClick={() => setStep(i)}></div>
            ))}
          </div>
          <div className="cinema-progress-track"><div className="cinema-progress-fill" ref={progRef}></div></div>
        </div>
        <button className="cinema-skip" data-testid="cinema-skip-btn" onClick={() => { clearTimeout(timer.current); startGame(); }}>⏭ SKIP INTRO</button>
      </div>
    </div>
  );
}
