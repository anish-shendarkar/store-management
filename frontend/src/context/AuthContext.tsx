import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  role: string | null;
  token: string | null;
  login: (data: { token: string; role: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (savedToken) setToken(savedToken);
    if (savedRole) setRole(savedRole);
    setLoading(false);
  }, []);

  const login = (data: { token: string; role: string }) => {
    setToken(data.token);
    setRole(data.role);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.clear();
  };

  if(loading) return null;

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
