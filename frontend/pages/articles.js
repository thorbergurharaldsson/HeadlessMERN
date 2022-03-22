import { connectToDatabase } from "../util/mongodb";
import styles from "../styles/Articles.module.scss";
import Layout from "../components/Layout/Layout";

const Articles = ({ articles }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>Articles</h1>

          <div className={styles.grid}>
            {articles.map((article, index) => (
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
    </Layout>
  );
};
export default Articles;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const articles = await db
    .collection("articles")
    .find({})
    // .sort({ metacritic: -1 })
    .toArray();

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
}
