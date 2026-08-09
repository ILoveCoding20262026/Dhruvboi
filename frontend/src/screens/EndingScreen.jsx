import React, { useEffect, useRef, useState } from "react";
import { useGame } from "@/game/GameContext";
import { ENDINGS, buildEndingScene, DIFFS } from "@/game/gameData";

const END_DUR = 6000;

export default function EndingScreen() {
  const { endingKey, game, resetGame, goto } = useGame();
  const e = ENDINGS[endingKey];
  const d = game.diffKey ? DIFFS[game.diffKey] : DIFFS.medium;
  const [step, setStep] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const timer = useRef(null);
  const progRef = useRef(null);

  useEffect(() => {
    if (!e) return;
    if (endingKey === "firoz_win" || endingKey === "tug_win") spawnCoins();
    return () => stopCoins();
    // eslint-disable-next-line
  }, [endingKey]);

  useEffect(() => {
    if (showQuote || !e) return;
    clearTimeout(timer.current);
    if (progRef.current) {
      progRef.current.style.transition = "none";
      progRef.current.style.width = "0%";
      setTimeout(() => {
        if (progRef.current) { progRef.current.style.transition = `width ${END_DUR}ms linear`; progRef.current.style.width = "100%"; }
      }, 50);
    }
    timer.current = setTimeout(() => {
      if (step < e.scenes.length - 1) setStep(step + 1);
      else setShowQuote(true);
    }, END_DUR);
    return () => clearTimeout(timer.current);
  }, [step, showQuote, e]);

  if (!e) return null;
  const c = e.color;
  const scene = e.scenes[step];

  const playAgain = () => { stopCoins(); resetGame(); goto("cover"); };

  return (
    <div id="screen-ending" className="screen active" data-testid="ending-screen">
      <div className="ending-cinema">
        {!showQuote && (
          <div id="ending-scene-view">
            <div className="ending-bg" dangerouslySetInnerHTML={{ __html: buildEndingScene(endingKey, step) }} />
            <div className="ending-overlay" style={{ background: "linear-gradient(to top,rgba(3,2,1,.55) 0%,transparent 50%)" }}></div>
            <button className="cinema-skip" style={{ pointerEvents: "all" }} data-testid="skip-verdict-btn" onClick={() => setShowQuote(true)}>⏭ SKIP TO VERDICT</button>
            <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center", zIndex: 20, pointerEvents: "none" }}>
              <div className="ending-scene-label" style={{ marginBottom: 6 }}>SCENE {step + 1} OF {e.scenes.length}</div>
              <div className="ending-scene-title" style={{ color: c }} key={`t${step}`}>{scene.title}</div>
              <div className="ending-scene-body" style={{ maxWidth: 520, margin: "6px auto 14px" }} key={`b${step}`}>{scene.body}</div>
              <div className="ending-dots" style={{ marginBottom: 10 }}>
                {e.scenes.map((_, i) => (
                  <div className="ending-dot" key={i} style={{ background: i === step ? c : "#2e1e08", boxShadow: i === step ? `0 0 8px ${c}` : "none", cursor: "pointer", pointerEvents: "all" }} onClick={() => setStep(i)}></div>
                ))}
              </div>
              <div className="ending-progress-track" style={{ margin: "0 auto" }}><div className="ending-progress-fill" ref={progRef} style={{ background: c }}></div></div>
            </div>
          </div>
        )}

        {showQuote && (
          <div style={{ position: "absolute", inset: 0, background: "var(--dark)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 10%", zIndex: 30, animation: "fadeUp 1s ease" }} data-testid="verdict-view">
            <div className="ending-icon" style={{ color: c }}>{e.type === "win" ? "✦" : "†"}</div>
            <h1 className="ending-title" style={{ color: c }} data-testid="verdict-title">{e.title}</h1>
            <div className="ending-sub" style={{ color: c }}>{e.sub}</div>
            <blockquote className="ending-quote">"{e.quote}"<span className="ending-attr">— {d.ruler}</span></blockquote>
            <button className="btn-restart" style={{ background: `linear-gradient(135deg,${c},${c}99)` }} data-testid="play-again-btn" onClick={playAgain}>PLAY AGAIN</button>
          </div>
        )}
      </div>
    </div>
  );
}

function spawnCoins() {
  let rain = document.getElementById("coin-rain");
  if (!rain) {
    rain = document.createElement("div");
    rain.id = "coin-rain";
    rain.className = "coin-rain";
    document.body.appendChild(rain);
  }
  rain.style.display = "block";
  rain.innerHTML = Array.from({ length: 30 }, () =>
    `<div class="coin" style="left:${Math.random() * 100}%;font-size:${16 + Math.random() * 14}px;animation-duration:${2 + Math.random() * 2.5}s;animation-delay:${Math.random() * 2.5}s">🪙</div>`).join("");
  setTimeout(() => { if (rain) { rain.style.display = "none"; rain.innerHTML = ""; } }, 7000);
}
function stopCoins() {
  const rain = document.getElementById("coin-rain");
  if (rain) { rain.style.display = "none"; rain.innerHTML = ""; }
}
