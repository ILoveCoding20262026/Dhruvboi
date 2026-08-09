import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../game/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("dsc_token");
    if (!token) { setLoading(false); return; }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      localStorage.removeItem("dsc_token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Skip /me if returning from Google OAuth callback (handled by AuthCallback)
    if (window.location.hash?.includes("session_id=")) { setLoading(false); return; }
    checkAuth();
  }, [checkAuth]);

  const applyToken = (token, u) => {
    localStorage.setItem("dsc_token", token);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("dsc_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, applyToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
