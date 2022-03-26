import Link from "next/link";
import styles from "./Nav.module.scss";

import Container from "../Container/Container";

import Image from "next/image";
import logo from "../../public/logo.png";

const Nav = () => {
  return (
    <Container>
      <div className={styles.section}>
        <div className={styles.navSection}>
          <div className={styles.navLogo}>
            <Link href="/">
              <a>
                <Image
                  src={logo}
                  alt="Studio Code Logo"
                  width={113.45}
                  height={80}
                />
              </a>
            </Link>
          </div>

          <ul className={styles.navMenu}>
            <li>
              <Link href="/articles">
                <h5>
                  <a>Articles</a>
                </h5>
              </Link>
            </li>
            <li>
              <Link href="/assignments">
                <h5>
                  <a>Projects</a>
                </h5>
              </Link>
            </li>

            <li className={styles.navSubMenu}>
              <Link href="https://horsemern.xyz/">
                <a target="_blank" rel="noreferrer">
                  <button className={styles.buttonSmall}>Login</button>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Nav;
