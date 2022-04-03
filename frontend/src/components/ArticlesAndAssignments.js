import React from "react";
import ReactMarkdown from "react-markdown";
import dateParts from "../utils/dateParts";
import styles from "../styles/index.module.scss";
import Link from "next/link";

const ArticlesAndAssignments = ({ dataArr }) => {
  // calculate time to read
  const timeToRead = (text) => {
    const words = text.split(" ");
    const wordsPerMinute = words.length / (60 * 2);
    return wordsPerMinute < 1 ? 1 : Math.round(wordsPerMinute);
  };

  // load first 40 words of article
  const loadFirst40Words = (content) => {
    const text = content;
    const words = text.split(" ");
    const first40Words = words.slice(0, 40);
    const first40WordsJoined = first40Words.join(" ");
    return first40WordsJoined;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          {dataArr.flatMap((entry, index) =>
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
                    <ReactMarkdown children={loadFirst40Words(entry.comment)} />
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
                    <Link href={`/articles/${entry.slug}`}>
                      <h2>{entry.title}</h2>
                    </Link>
                    <h4>{entry.subtitle}</h4>
                    <ReactMarkdown>
                      {loadFirst40Words(entry.content)}
                    </ReactMarkdown>
                    <div className={styles.tagContainer}>
                      <button className={styles.buttonTag}>Tag</button>
                      <button className={styles.buttonTag}>Tag</button>
                      <p
                        className={styles.pSmall}
                        style={{ paddingLeft: "3rem" }}
                      >
                        {timeToRead(entry.content)}m to read
                      </p>
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
