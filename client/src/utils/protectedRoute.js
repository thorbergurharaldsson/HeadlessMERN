import React, { useEffect } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen";

export default function ProtectedRoute(Component) {
  return function FuncWithProps(props) {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated && !loading) navigate("/auth/login");
    }, [loading, isAuthenticated]);

    return (
      <>
        {isAuthenticated ? (
          <Component {...props} />
        ) : (
          <LoadingScreen loading={true} />
        )}
      </>
    );
  };
}
