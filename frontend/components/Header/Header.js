import React, { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

import Container from "../Container/Container";

import Image from "next/image";
import arrowDown from "../../public/arrowDown.png";
import arrowDown2 from "../../public/arrowDown2.png";

const Header = () => {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);

  return (
    <Container>
      <div className={styles.header}>
        <div className={styles.grid}>
          <div>
            <h1 className={styles.title}>
              .welcome&#123;
              <span className={styles.subtitle}>to studio code</span>
              &#125;
            </h1>
          </div>
          <div>
            <h3>Welcome to our Studio .</h3>
            <h4>
              This is the Showroom of the students of the Reykjavík Academy of
              Web Development .
            </h4>
            <Link href="/">
              <a>
                <button className={styles.button}>More</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={styles.arrowDown}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {isShown && (
          <Link href="/main">
            <a>
              <Image src={arrowDown2} alt="Arrow down" width={42} height={28} />
            </a>
          </Link>
        )}
        {!isShown && (
          <Link href="/main">
            <a>
              <Image src={arrowDown} alt="Arrow down" width={42} height={28} />
            </a>
          </Link>
        )}
      </div>
    </Container>
  );
};

export default Header;
