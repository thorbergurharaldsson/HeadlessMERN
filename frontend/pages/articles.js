import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import styles from "../styles/Articles.module.scss";

function Articles() {
  const [id, setID] = useState();
  const { data } = useSWR("/articles", fetcher);
  // console.log(data);
  if (!data) return <div>Loading...</div>;

  // to get coords to pass it into another API to get the weather
  const getID = async (id) => {
    // console.log(id);
    setID(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Articles</h1>

        <div className={styles.grid}>
          {data.data.map((article, index) => (
            <div key={index} className={styles.card}>
              <h2>{article.title}</h2>
              <h3>{article.subtitle}</h3>
              {/* <h4>{article.author}</h4> */}
              <p>{article.content}</p>
              <button onClick={(e) => getID(e.target.value)}>
                <option value={article._id}>Button</option>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;