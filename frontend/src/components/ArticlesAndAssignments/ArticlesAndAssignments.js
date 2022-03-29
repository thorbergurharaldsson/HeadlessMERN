import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { horsemernAPI } from "../../utils/api";
import dateParts from "../../utils/dateParts";
import styles from "../../styles/index.module.scss";

const ArticlesAndAssignments = () => {
  const [concatArr, setConcatArr] = useState([]);

  const concatenate = async (path1, path2) => {
    const assignments = await horsemernAPI.get(`${path1}`);
    const articles = await horsemernAPI.get(`${path2}`);

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
                    <h2>{entry.assignmentTitle}</h2>
                    <h4>{entry.moduleTitle}</h4>
                    <p>{entry.comment}</p>
                    <button onClick={(e) => getID(e.target.value)}>
                      <option value={entry._id}>...</option>
                    </button>
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
                    <h2>{entry.title}</h2>
                    <h4>{entry.subtitle}</h4>
                    <ReactMarkdown>
                      {loadFirst40Words(entry.content)}
                    </ReactMarkdown>
                    <button onClick={(e) => getID(e.target.value)}>
                      <option value={entry._id}>...</option>
                    </button>
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
