import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Anonymous per-device player id — no email/login required.
export function getPlayerId() {
  let id = localStorage.getItem("dsc_player");
  if (!id) {
    id = "guest_" + ((crypto?.randomUUID && crypto.randomUUID()) || Math.random().toString(36).slice(2) + Date.now().toString(36));
    localStorage.setItem("dsc_player", id);
  }
  return id;
}

const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  config.headers["X-Player-Id"] = getPlayerId();
  return config;
});

export function formatApiError(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default api;
