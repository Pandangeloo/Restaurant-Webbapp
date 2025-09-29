import { createContext, useEffect, useState, type ReactNode } from "react";
import {
  getCurrentUser,
  type CurrentUser,
  login as apiLogin,
  logout as apiLogout,
} from "./utils/auth";

type AuthContextType = {
  user: CurrentUser | null;
  loading: boolean;
  login: (data: { email: string; password: string }) => Promise<CurrentUser>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {
    throw new Error("AuthContext not initialized");
  },
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const u = await apiLogin(data);
    setUser(u);
    return u;
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error("Failed to logout:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
