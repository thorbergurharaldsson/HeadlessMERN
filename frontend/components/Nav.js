import Link from "next/link";
import Logo from "./Logo";
import navStyles from "../styles/Nav.module.css";
import logoStyles from "../styles/Logo.module.css";

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li className={logoStyles.img}>
          <Logo />
        </li>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
        <li>
          <Link href="/assignments">Projects</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
