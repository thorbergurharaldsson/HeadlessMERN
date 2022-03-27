import React, { useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.scss";

import Container from "../Container/Container";

import Image from "next/image";
import logo from "../../public/logo.png";
import logo2 from "../../public/logo2.png";

const Nav = () => {
  // to change the logo on hover
  const [isShown, setIsShown] = useState(false);

  return (
    <Container>
      <div className={styles.navBar}>
        <div
          className={styles.navLogo}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {isShown && (
            <Link href="/">
              <a>
                <Image
                  src={logo2}
                  alt="Studio Code Logo"
                  width={113.45}
                  height={80}
                />
              </a>
            </Link>
          )}
          {!isShown && (
            <Image
              src={logo}
              alt="Studio Code Logo"
              width={113.45}
              height={80}
            />
          )}
        </div>

        <ul className={styles.navMenu}>
          <li>
            <Link href="/">
              <h5>
                <a>About</a>
              </h5>
            </Link>
          </li>
          <li>
            <Link href="/content">
              <h5>
                <a>Content</a>
              </h5>
            </Link>
          </li>

          <li className={styles.navSubMenu}>
            <Link href="https://horsemern.xyz/">
              <a target="_blank" rel="noreferrer">
                <button className={styles.button}>Login</button>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Nav;
