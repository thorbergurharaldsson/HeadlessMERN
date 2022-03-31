import React, { useState } from "react";
import Link from "next/link";
import styles from "./Content.module.scss";

import ArticlesAndAssignments from "../ArticlesAndAssignments";
import Dropdown from "../Dropdown/Dropdown";

import Image from "next/image";
import arrowDown from "../../../public/arrowDown.png";
import arrowDown2 from "../../../public/arrowDown2.png";

export default function Content({ dataArr, articles, assignments }) {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);

  // to get the type in browse by
  const [type, setType] = useState("Browse by");
  const browseBy = async (type) => {
    setType(type);
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
          onSelect={(id) => browseBy(id)}
        />
      </div>
      <div>
        {(() => {
          if (type === "articles") {
            return <ArticlesAndAssignments dataArr={articles} />;
          } else if (type === "assignments") {
            return <ArticlesAndAssignments dataArr={assignments} />;
          } else {
            return <ArticlesAndAssignments dataArr={dataArr} />;
          }
        })()}
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
