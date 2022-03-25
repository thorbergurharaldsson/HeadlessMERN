import Link from "next/link";
import styles from "./Header.module.scss";

import Container from "../Container/Container";

import Image from "next/image";
import arrowDown from "../../public/arrowDown.png";

const Header = () => {
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
            <h3>What is it?</h3>
            <p>
              It's the Showroom of the Students of the Reykjavík Academy of Web
              Development. Here, we share with you our projects, our thoughts
              and more!
            </p>
            <Link href="/">
              <a>
                <button className={styles.buttonSmall}>More</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.arrow}>
        <Link href="/">
          <a>
            <Image src={arrowDown} alt="arrow down" width={42} height={28} />
          </a>
        </Link>
      </div>
    </Container>
  );
};

export default Header;
