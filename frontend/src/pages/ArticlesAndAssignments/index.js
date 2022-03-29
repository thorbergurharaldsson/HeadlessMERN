import React, { useState, useEffect } from "react";
import { horsemernAPI } from "../../utils/api";
import dateParts from "../../utils/dateParts";
import styles from "../../styles/index.module.scss";
import Link from "next/link";

const ArticlesAndAssignments = () => {
  const [id, setID] = useState();

  const getID = async (e) => {
    console.log(e);
    setID(e);
  };

  const [concatArr, setConcatArr] = useState([]);

  const concatenate = async (path1, path2) => {
    const assignments = await horsemernAPI.get(`${path1}`);
    const articles = await horsemernAPI.get(`${path2}`);
    // console.log(assignments.data);
    // console.log(articles.data.data);
    setConcatArr(
      assignments.data.concat(articles.data.data).sort((a, b) => {
        return (
          new Date(b.posted_at || b.createdAt) -
          new Date(a.posted_at || a.createdAt)
        );
      })
    );
  };

  useEffect(() => {
    concatenate("/assignments", "/articles");
  }, []);

  useEffect(() => {
    setConcatArr(concatArr);
  }, [concatArr]);

  if (concatArr.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          {concatArr.flatMap((entry, index) =>
            entry.published ? (
              <div key={index}>
                {"moduleTitle" in entry ? (
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
                    {/* <button onClick={(e) => getID(e.target.value)}>
                      <option value={entry.moduleTitle}>...</option>
                    </button> */}
                  </div>
                ) : (
                  <div key={index} className={styles.card}>
                    <p>{entry.authorName}</p>
                    <p className={styles.pSmall}>
                      {(() => {
                        const d = dateParts(entry.posted_at);
                        return `${d.month} ${d.day}, ${d.year}`;
                      })()}
                    </p>
                    <Link href={`/articles/${entry._id}`}>
                      <h2>{entry.title}</h2>
                    </Link>
                    <h4>{entry.subtitle}</h4>
                    <p> {entry.content}</p>

                    {/* <button onClick={(e) => getID(e.target.value)}>
                      <option value={entry.moduleTitle}>...</option>
                    </button> */}
                    <div className={styles.tagContainer}>
                      <button className={styles.buttonTag}>Tag</button>
                      <button className={styles.buttonTag}>Tag</button>
                    </div>
                  </div>
                )}
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default ArticlesAndAssignments;
