import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Logout from "./logout";

function Auth() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default Auth;
