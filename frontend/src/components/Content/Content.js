import React, { useState, useEffect } from "react";
import Link from "next/link";
import { horsemernAPI } from "../../utils/api";
import styles from "./Content.module.scss";

import ArticlesAndAssignments from "../../pages/ArticlesAndAssignments";
import Dropdown from "../Dropdown/Dropdown";

import Image from "next/image";
import arrowDown from "../../../public/arrowDown.png";
import arrowDown2 from "../../../public/arrowDown2.png";

export default function Content() {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);

  // to get the type in browse by
  const [type, setType] = useState("Browse by");
  const browseBy = async (type) => {
    setType(type);
    console.log(type);
    const res = await horsemernAPI.get(`${type}`);
    const data = await res.json();
    console.log(data);
  };

  // // API call
  // const { data, error } = useSWR(`/${type}`, fetcher);
  // console.log(data);

  // if (error) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div id="content" className={styles.container}>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Search</button>

        <Dropdown
          options={[
            // {
            //   id: "",
            //   text: "Browse by",
            // },
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
          onSelect={(id) => browseBy(id)}
        />
      </div>
      <div>
        <ArticlesAndAssignments />
      </div>
      <div className={styles.arrowUpContainer}>
        <div
          className={styles.arrowUp}
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
}
