import React, { createContext, useState, useEffect, useContext } from "react";
import { horsemernAPI, tskoliAPI } from "./api";
import useSWR from "swr";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { tsdata } = useSWR("/auth/me", tskoliAPI.get);
  const fetchedUser = tsdata && tsdata.data;
  const finished = Boolean(tsdata);
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
    const result = await tskoliAPI.get("/auth/me");

    if (result.status === 200) {
      setUser(result.data);
      createAuthorIfNotExisting(user.tskoliID);
    }
    if (result.status === 401) {
      window.location.replace(`https://io.tskoli.dev/auth/sso`);
    }
    return result;
  };

  const createAuthorIfNotExisting = (id) => {
    const { hmdata } = horsemernAPI.get(`/authors/${id}`);
    console.log(hmdata);
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
