import { useEffect } from "react";
import { useAuth } from "../../utils/authContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import style from "../../styles/components/Login.module.scss";

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
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.login}>
        <h1 className={style.display1}>
          <span style={{ color: "var(--secondary-color)" }}>if</span> (student)
          {" {"}
        </h1>
        <button className="button-login" onClick={() => login()}>
          Login
        </button>
        <h1 className={style.display1}>{"}"} </h1>

        <h1 className={style.display1}>
          <span style={{ color: "var(--secondary-color)" }}>else</span> {"{"}
        </h1>
        <button
          className="button-login"
          onClick={() => navigate("https://horsemern.vercel.app/")}
        >
          Back
        </button>
        <h1 className={style.display1}>{"}"}</h1>
      </div>
    </>
  );
}
