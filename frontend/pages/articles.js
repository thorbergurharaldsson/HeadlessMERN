import { connectToDatabase } from "../util/mongodb";
import articleStyles from "../styles/Articles.module.css";

const Articles = ({ articles }) => {
  return (
    <div className={articleStyles.container}>
      <main className={articleStyles.main}>
        <h1 className={articleStyles.title}>Articles</h1>

        <div className={articleStyles.grid}>
          {articles.map((article, index) => (
            <div key={index} className={articleStyles.card}>
              <h2>{article.title}</h2>
              <h3>{article.subtitle}</h3>
              {/* <h4>{article.author}</h4> */}
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
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
