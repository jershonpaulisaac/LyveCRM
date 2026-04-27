import { Role, SessionUser } from "@/lib/types";

const SESSION_KEY = "lyvecrm-session";

export function getRouteForRole(role: Role) {
  if (role === "platform_owner") return "/platform";
  if (role === "company_admin") return "/company";
  return "/user";
}

export function storeSession(session: SessionUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getStoredSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as SessionUser) : null;
}

export function clearStoredSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
