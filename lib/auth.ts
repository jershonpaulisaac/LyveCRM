import { Role, SessionUser } from "@/lib/types";

const SESSION_KEY = "lyvecrm-session";

export function getRouteForRole(role: Role) {
  if (role === "platform_owner") return "/platform";
  if (role === "company_admin") return "/company";
  return "/user";
}

export function storeSession(session: SessionUser, remember = true) {
  if (typeof window === "undefined") return;
  if (remember) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    window.sessionStorage.removeItem(SESSION_KEY);
  } else {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    window.localStorage.removeItem(SESSION_KEY);
  }
}

export function getStoredSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as SessionUser) : null;
}

export function clearStoredSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}
