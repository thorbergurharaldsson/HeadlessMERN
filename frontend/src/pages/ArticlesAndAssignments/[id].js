import styles from "../../styles/Articles.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";

const BlogPost = ({ entry }) => {
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
    <div className={styles.parent}>
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

      <div className={styles.recommended}>
        <h2 className={styles.recommendedTitle}>You might also like</h2>
        {data.data.slice(0, 3).map((article, index) => (
          <div key={index} className={styles.cardSmall}>
            <div>
              <p className={styles.recommendedP}>{article.authorName}</p>
            </div>
            <h3 className={styles.recommendedh3}>{article.title}</h3>
            <h5 className={styles.recommendedh4}>{article.subtitle}</h5>
            <p className={styles.recommendedP}>{article.posted_at}</p>
            <Link href={`/articles/${article._id}`}>
              <button className={styles.buttonSmall}>View article</button>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.author}>
        <div className={styles.avatar}>
          <div className={styles.avatar__letters}> FU </div>
        </div>
        <p className={styles.authorName}>{post.data.authorName}</p>
        <p className={styles.authorBio}>
          this is me. I like pc and various things, like coding and love makings
        </p>
      </div>
      <div className={styles.more}>
        <p className={styles.moreHeader}>More from {post.data.authorName}</p>
        {data.data.slice(0, 3).map((article, index) => (
          <div key={index} className={styles.moreCont}>
            <p className={styles.moreP}>{article.title}</p>
            <Link href={`/articles/${article._id}`}>
              <button className={styles.moreBtn}>View article</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  const posts = await res.json();

  const paths = posts.data.map((post) => ({
    params: { id: entry._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}`
  );
  const entry = await res.json();

  return {
    props: { entry },
  };
}

export default BlogPost;
