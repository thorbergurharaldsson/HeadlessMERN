import { useState, useEffect } from "react";
import { useAuth } from "../../utils/authContext";
import { signInWithTskoli } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
    navigate("/auth/login", { replace: true });
  }, [isAuthenticated]);

  return (
    <>
      <button className="button-login" onClick={() => signInWithTskoli()}>
        Login with tskoli.dev
      </button>
    </>
  );
}
