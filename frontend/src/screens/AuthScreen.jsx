import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api, { formatApiError } from "@/game/api";

export default function AuthScreen() {
  const { applyToken } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const path = mode === "login" ? "/auth/login" : "/auth/register";
      const payload = mode === "login" ? { email, password } : { email, password, name };
      const { data } = await api.post(path, payload);
      applyToken(data.token, data.user);
    } catch (err) {
      setError(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setBusy(false);
    }
  };

  const googleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="auth-screen" data-testid="auth-screen">
      <div className="auth-card">
        <div className="auth-title">ENTER<br />THE COURT</div>
        <div className="auth-sub">DELHI SULTANATE · 13TH CENTURY</div>

        {error && <div className="auth-error" data-testid="auth-error">{error}</div>}

        <form onSubmit={submit}>
          {mode === "register" && (
            <div className="auth-field">
              <label className="auth-label">Your Name</label>
              <input className="auth-input" data-testid="auth-name-input" value={name}
                onChange={(e) => setName(e.target.value)} placeholder="Farrukh" required />
            </div>
          )}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input className="auth-input" data-testid="auth-email-input" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input className="auth-input" data-testid="auth-password-input" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••" required minLength={6} />
          </div>
          <button className="auth-btn" data-testid="auth-submit-btn" type="submit" disabled={busy}>
            {busy ? "…" : mode === "login" ? "ENTER" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="auth-divider"><span>OR</span></div>
        <button className="auth-google" data-testid="auth-google-btn" onClick={googleLogin}>
          Continue with Google
        </button>

        <div className="auth-switch">
          {mode === "login" ? "New to the court?" : "Already summoned?"}{" "}
          <button data-testid="auth-toggle-mode" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Create an account" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
