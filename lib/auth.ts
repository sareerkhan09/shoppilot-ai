const AUTH_KEY = "shoppilot_auth";

const VALID_EMAIL = "admin@shoppilot.ai";
const VALID_PASSWORD = "admin123";

export interface AuthSession {
  email: string;
  loggedInAt: string;
}

export function login(email: string, password: string): boolean {
  if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
    const session: AuthSession = {
      email: VALID_EMAIL,
      loggedInAt: new Date().toISOString(),
    };
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logout(): void {
  window.localStorage.removeItem(AUTH_KEY);
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}