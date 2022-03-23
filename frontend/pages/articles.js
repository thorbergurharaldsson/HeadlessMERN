import styles from "../styles/Articles.module.scss";

import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("https://api.horsemern.xyz/api/articles");
  const data = await response.json();
  return data;
};

function Articles() {
  const { data, error } = useSWR("articles", fetcher);
  // console.log(data);
  if (error) return <div>Failed to load</div>;
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
