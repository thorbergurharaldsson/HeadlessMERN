import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import Link from "next/link";
import styles from "../styles/index.module.scss";
import dateParts from "../utils/dateParts";

import Container from "../components/Container/Container";

import Articles from "./articles";
import Assignments from "./assignments";

import Image from "next/image";
import arrowDown from "../../public/arrowDown.png";
import arrowDown2 from "../../public/arrowDown2.png";

import Dropdown from "../components/Dropdown/Dropdown";

export default function Content() {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);
  return (
    <Container>
      <div id="content" className={styles.container}>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Search</button>

          <Dropdown
            options={[
              {
                id: "articles",
                text: "Articles",
              },
              {
                id: "assignments",
                text: "Projects",
              },
            ]}
            text="Browse by"
            onSelect={(id) => console.log(id)}
          />
        </div>
        <div>
          <Articles />
          <Assignments />
        </div>
        <div className={styles.arrowUpContainer}>
          <div
            className={styles.arrowUp}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            {isShown && (
              <Link href="/content">
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
              <Link href="/content">
                <a>
                  <Image
                    src={arrowDown}
                    alt="Arrow down"
                    width={42}
                    height={28}
                  />
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
