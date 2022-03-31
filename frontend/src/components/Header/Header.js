import React, { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

import Image from "next/image";
import arrowDown from "../../../public/arrowDown.png";
import arrowDown2 from "../../../public/arrowDown2.png";

const Header = () => {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.grid}>
        <div className={styles.gridTitle}>
          <h1 className={styles.title}>
            .webDev&#123;
            <br />
            semester
            <span className={styles.subtitle}> 2021/2022</span>
            <br />
            &#125;
          </h1>
        </div>
        <div className={styles.gridContent}>
          <h3>Welcome to our Studio.</h3>
          <h4>
            This is the Showroom of the students of the Reykjavík Academy of Web
            Development.
          </h4>
          <Link href="/about">
            <a>
              <button className={styles.button}>More</button>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.arrowDownContainer}>
        <div
          className={styles.arrowDown}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {isShown && (
            <Link href="#content">
              <a>
                <Image
                  src={arrowDown2}
                  alt="Arrow down"
                  width={42}
                  height={28}
                />
              </a>
            </Link>
          )}
          {!isShown && (
            <Image src={arrowDown} alt="Arrow down" width={42} height={28} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
