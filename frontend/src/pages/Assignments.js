import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import dateParts from "../utils/dateParts";
import styles from "../styles/index.module.scss";
import Link from "next/link";

function Assignments() {
  const { data } = useSWR("/assignments", fetcher);
  console.log(data);

  if (!data) return <div>Loading ...</div>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          {data.data.map((entry, index) =>
            entry.published ? (
              <div key={index} className={styles.card}>
                <p>{entry.author}</p>
                <p className={styles.pSmall}>
                  {(() => {
                    const d = dateParts(entry.createdAt);
                    return `${d.month} ${d.day}, ${d.year}`;
                  })()}
                </p>
                <Link href={`/assignments/${entry._id}`}>
                  <h2>{entry.assignmentTitle}</h2>
                </Link>

                <h4>{entry.moduleTitle}</h4>
                <p dangerouslySetInnerHTML={{ __html: entry.comment }}></p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

export default Assignments;
