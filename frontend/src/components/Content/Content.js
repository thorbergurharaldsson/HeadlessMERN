import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import Link from "next/link";
import styles from "./Content.module.scss";
import dateParts from "../../utils/dateParts";

// import Container from "../Container/Container";

import Articles from "../../pages/articles";
import Assignments from "../../pages/assignments";

import Image from "next/image";
import arrowDown from "../../../public/arrowDown.png";
import arrowDown2 from "../../../public/arrowDown2.png";

import Dropdown from "../Dropdown/Dropdown";

export default function Content() {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);

  // to browse by
  const getContent = async (id) => {
    const { data, error } = useSWR("/articles", fetcher);
  };

  return (
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
  );
}
