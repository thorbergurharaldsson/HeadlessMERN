import React, { createContext, useState, useEffect, useContext } from "react";
import { horsemernAPI, tskoliAPI } from "./api";
import useSWR from "swr";

export const AuthContext = createContext({});

const dev = process.env.REACT_APP_NODE_ENV === "development";
let tskoliWeb = "https://io.tskoli.dev";
if (dev) {
  tskoliWeb = "http://localhost:3002";
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data } = useSWR("/auth/me", dev ? horsemernAPI.get : tskoliAPI.get);
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
    const result = dev
      ? await horsemernAPI.get("/auth/me")
      : await tskoliAPI.get("/auth/me");

    if (result.status === 200) {
      setUser(result.data);
    }
    if (result.status === 401) {
      window.location.replace(`${tskoliWeb}/auth/sso`);
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
