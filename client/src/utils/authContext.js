import React, { createContext, useState, useEffect, useContext } from "react";
import { tskoliAPI } from "./api";
import useSWR from "swr";

export const AuthContext = createContext({});

const dev = process.env.REACT_APP_NODE_ENV === "development";

let tskoliWeb = "https://io.tskoli.dev";

if (dev) {
  tskoliWeb = "http://localhost:3002";
}

const hmAPI = process.env.REACT_APP_HORSEMERN_API;

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
      createAuthorIfNotExisting(result.data._id);
    }
    if (result.status === 401) {
      window.location.replace(`${tskoliWeb}/auth/sso`);
    }
    return result;
  };

  const createAuthorIfNotExisting = (id) => {
    const author = fetch(`${hmAPI}/authors/${id}`, {
      method: "GET",
    }).then(async (res) => ({ data: await res.json(), status: res.status }));
    console.log(author.status);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        login,
        setUser,
        createAuthorIfNotExisting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
