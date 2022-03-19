import { Link } from "react-router-dom";

import "./Header.scss";
import Logo from "../logo/Logo";

function Header() {
  return (
    <header className="header">
      <Logo />
      <div className="links">
        <Link to="/studio">Studio</Link>
      </div>
    </header>
  );
}

export default Header;
