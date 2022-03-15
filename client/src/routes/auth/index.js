import { Route, Routes } from "react-router-dom";
import Login from "./login";

function Auth() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
}

export default Auth;
