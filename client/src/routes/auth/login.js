import { useState, useEffect } from "react";
import { useAuth } from "../../utils/authContext";
import { signInWithTskoli } from "../../firebase";
import { useNavigate } from "react-router-dom";

// import Layout from "../../components/Layout";
// import Notice from "../../components/Notice";
import style from "../../styles/components/Login.module.scss";

export default function Login() {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/studio", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <>
      <button
        className="firebase__btn firebase__tskoli"
        onClick={() => signInWithTskoli()}
      >
        Login with tskoli.dev
      </button>
    </>
  );
}
