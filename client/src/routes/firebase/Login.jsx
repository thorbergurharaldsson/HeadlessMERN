import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle, signInWithTskoli } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Firebase.scss";
import Header from "../../components/header/Header";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <div>
      <Header />
    <div className="firebase">
      <div className="firebase__container">
        <input
          type="text"
          className="firebase__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="firebase__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="firebase__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="firebase__btn firebase__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <button className="firebase__btn firebase__tskoli" onClick={signInWithTskoli}>
          Login with tskoli.dev
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
