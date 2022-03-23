import styles from "./Footer.module.scss";

import Section from "../Section/Section";
import Container from "../Container/Container";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Section className={styles.footerMenu}>
        <Container>
          <ul className={styles.footerMenuColumns}>
            <li>
              <Link href="/">
                <a className={styles.footerMenuTitle}>
                  <strong>Recent Posts</strong>
                </a>
              </Link>
              <ul className={styles.footerMenuItems}>
                <li>
                  <Link href="/">
                    <a>Title</a>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link href="/">
                <a className={styles.footerMenuTitle}>
                  <strong>Categories</strong>
                </a>
              </Link>
              <ul className={styles.footerMenuItems}>
                <li>
                  <Link href="/">
                    <a>Title</a>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <p className={styles.footerMenuTitle}>
                <strong>More</strong>
              </p>
              <ul className={styles.footerMenuItems}>
                <li>
                  <a href="/">RSS</a>
                </li>
                <li>
                  <a href="/">Sitemap</a>
                </li>
              </ul>
            </li>
          </ul>
        </Container>
      </Section>

      <Section className={styles.footerLegal}>
        <Container>
          <p>Footer Legal</p>
        </Container>
      </Section>
    </footer>
  );
};

export default Footer;
