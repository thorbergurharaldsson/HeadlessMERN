import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import useSWR from "swr";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR("/auth/me", api.get);
  const fetchedUser = data && data.data;
  const finished = Boolean(data);
  const hasUser = Boolean(fetchedUser && fetchedUser._id);

  useEffect(() => {
    if (hasUser) {
      setUser(fetchedUser);
    } else {
      setUser(null);
    }

    setLoading(!finished);
  }, [finished, hasUser]);

  const login = async ({ email, password }) => {
    const result = await api.post("/auth/login", { email, password });

    if (result.status === 200) {
      setUser(result.data);
    }

    return result;
  };

  const logout = async () => {
    const result = await api.delete("/auth/logout");
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
