import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/index.module.scss";

import Image from "next/image";
import arrowDown from "../../public/arrowDown.png";
import arrowDown2 from "../../public/arrowDown2.png";
import about from "../../public/about.png";

import Container from "../components/Container/Container";
import Nav from "../components/Nav/Nav";

const Header = () => {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);

  return (
    <Container>
      <Nav />
      <div className={styles.header}>
        <div className={styles.grid}>
          <div className={styles.arrowSideContainer}>
            <div
              className={styles.arrowSide}
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
                <Image
                  src={arrowDown}
                  alt="Arrow down"
                  width={42}
                  height={28}
                />
              )}
            </div>
          </div>
          <div className={styles.gridContent}>
            <h2 className={styles.title}>
              console.log
              <span className={styles.subtitle}>(about)</span>
              <br />
            </h2>
          </div>
        </div>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutImg}>
            <Image src={about} alt="Group of students" />
          </div>
          <p className={styles.aboutP}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Header;
