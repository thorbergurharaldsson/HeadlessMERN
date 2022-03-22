import { useEffect } from "react";
import { useAuth } from "../../utils/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/studio", { replace: true });
    }
    if (!isAuthenticated) navigate("/auth/login", { replace: true });
  }, [isAuthenticated]);

  return (
    <>
      <button className="button-login" onClick={() => login()}>
        Login with tskoli.dev
      </button>
    </>
  );
}
