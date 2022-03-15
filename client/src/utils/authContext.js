import React, { createContext, useState, useEffect, useContext } from "react";
import api from "./api";
import useSWR from "swr";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data } = useSWR("/auth/me", api.get);
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
  }, [finished, hasUser, fetchedUser]);

  const login = async () => {
    const result = await api.get("/auth/me");

    if (result.status === 200) {
      setUser(result.data);
    }
    if (result.status === 401) {
      window.location.replace(`https://io.tskoli.dev/auth/sso`);
    }
    return result;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, login, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
