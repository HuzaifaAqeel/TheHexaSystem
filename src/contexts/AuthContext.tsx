import React, { createContext, useContext, useState, useCallback } from "react";

/* ─── Admin credentials (hardcoded) ─── */
const ADMIN_EMAIL = "admin@hexasystem.com";
const ADMIN_PASSWORD = "HexaAdmin2026";

export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
  joinedAt: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; isAdmin: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): User | null {
  try {
    const s = localStorage.getItem("hexa_user");
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

function saveUser(u: User | null) {
  try {
    if (u) localStorage.setItem("hexa_user", JSON.stringify(u));
    else localStorage.removeItem("hexa_user");
  } catch {}
}

function getUsers(): { name: string; email: string; password: string }[] {
  try {
    const s = localStorage.getItem("hexa_users");
    return s ? JSON.parse(s) : [];
  } catch { return []; }
}

function saveUsers(users: { name: string; email: string; password: string }[]) {
  try { localStorage.setItem("hexa_users", JSON.stringify(users)); } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);

  const login = useCallback((email: string, password: string) => {
    const em = email.trim().toLowerCase();
    if (em === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      const u: User = { name: "Admin", email: ADMIN_EMAIL, isAdmin: true, joinedAt: new Date().toISOString() };
      setUser(u); saveUser(u);
      return { success: true, isAdmin: true };
    }
    const users = getUsers();
    const found = users.find(u => u.email.toLowerCase() === em);
    if (!found) return { success: false, isAdmin: false, error: "No account found with this email." };
    if (found.password !== password) return { success: false, isAdmin: false, error: "Incorrect password." };
    const u: User = { name: found.name, email: found.email, isAdmin: false, joinedAt: new Date().toISOString() };
    setUser(u); saveUser(u);
    return { success: true, isAdmin: false };
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    const em = email.trim().toLowerCase();
    if (em === ADMIN_EMAIL.toLowerCase()) return { success: false, error: "This email is reserved." };
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === em)) return { success: false, error: "An account with this email already exists." };
    if (password.length < 6) return { success: false, error: "Password must be at least 6 characters." };
    users.push({ name: name.trim(), email: em, password });
    saveUsers(users);
    const u: User = { name: name.trim(), email: em, isAdmin: false, joinedAt: new Date().toISOString() };
    setUser(u); saveUser(u);
    return { success: true };
  }, []);

  const logout = useCallback(() => { setUser(null); saveUser(null); }, []);

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
