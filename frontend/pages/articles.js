import styles from "../styles/Articles.module.scss";

import useSWR from "swr";

import { fetcher } from "../utils/api";

function Articles() {
  const { data } = useSWR("/articles", fetcher);
  // console.log(data);
  if (!data) return <div>Loading...</div>;

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
