import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import Link from "next/link";
import styles from "./Content.module.scss";
// import dateParts from "../../utils/dateParts";

import Articles from "../../pages/articles";
import Assignments from "../../pages/assignments";
import Dropdown from "../Dropdown/Dropdown";

import Image from "next/image";
import arrowDown from "../../../public/arrowDown.png";
import arrowDown2 from "../../../public/arrowDown2.png";

export default function Content() {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);

  // to browse by
  // useEffect(() => {
  //   handleContent("assignments");
  // }, []);

  const [content, setContent] = useState("Browse by");

  const handleContent = (content) => {
    setContent(content);
    // console.log(content);
  };

  // const { data, error } = useSWR(`/${content}`, fetcher);
  // console.log(data);

  return (
    <div id="content" className={styles.container}>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Search</button>

        <Dropdown
          options={[
            {
              id: "",
              text: "Browse by",
            },
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
          onSelect={(id) => handleContent(id)}
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
