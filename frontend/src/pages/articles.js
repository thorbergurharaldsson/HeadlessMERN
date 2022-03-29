import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import styles from "../styles/index.module.scss";
import dateParts from "../utils/dateParts";

function Articles() {
  const [id, setID] = useState();
  const { data, error } = useSWR("/articles", fetcher);
  // console.log(data);
  if (error)
    return (
      <div className={styles.loading}>
        <h5>Failed to load articles :(</h5>
      </div>
    );
  if (!data)
    return (
      <div className={styles.loading}>
        <h5>Loading articles...</h5>
      </div>
    );
  // to get the id from the clicked article
  const getID = async (id) => {
    // console.log(id);
    setID(id);
  };

  return (
    <div>
      <div className={styles.container}>
        <div>
          <div className={styles.cardContainer}>
            {data.data.data.map((article, index) => (
              <div key={index} className={styles.card}>
                <p>{article.author}</p>
                <p className={styles.pSmall}>
                  {(() => {
                    const d = dateParts(article.posted_at);
                    return `${d.month} ${d.day}, ${d.year}`;
                  })()}
                </p>
                <h2>{article.title}</h2>
                {/* <h3>{assignment.description}</h3> */}
                <h4>{article.subtitle}</h4>
                <p> {article.content}</p>
                <button onClick={(e) => getID(e.target.value)}>
                  <option value={article._id}>...</option>
                </button>
                <div className={styles.tagContainer}>
                  <button className={styles.buttonTag}>Tag</button>
                  <button className={styles.buttonTag}>Tag</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
