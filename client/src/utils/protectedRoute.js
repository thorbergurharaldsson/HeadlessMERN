import React, { useEffect } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(Component) {
  return function FuncWithProps(props) {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated && !loading)
        navigate("/auth/login", { replace: true });
    }, [loading, isAuthenticated]);

    return (
      <>{isAuthenticated ? <Component {...props} /> : <p>Loading...</p>}</>
    );
  };
}
