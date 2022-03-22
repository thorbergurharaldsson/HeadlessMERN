import Link from "next/link";
import styles from "./Nav.module.scss";

import Image from "next/image";
import logo from "../../public/logo.png";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.section}>
        <div className={styles.navSection}>
          <div className={styles.navLogo}>
            <Link href="/">
              <Image
                src={logo}
                alt="Studio Code Logo"
                width={149}
                height={100}
              />
            </Link>
          </div>

          <ul className={styles.navMenu}>
            <li className={styles.navSubMenu}>
              <Link href="/articles">Articles</Link>
            </li>
            <li className={styles.navSubMenu}>
              <Link href="/assignments">Projects</Link>
            </li>
            <li className={styles.navSubMenu}>
              <Link href="https://horsemern.xyz/">
                <a target="_blank" rel="noreferrer">
                  Login
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
