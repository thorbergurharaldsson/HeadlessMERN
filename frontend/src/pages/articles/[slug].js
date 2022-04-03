import styles from "../../styles/singlePost.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import { horsemernAPI } from "../../utils/api";
import dateParts from "../../utils/dateParts";
import ReactMarkdown from "react-markdown";

import Nav from "../../components/Nav/Nav";

import Image from "next/image";
import arrowDown from "../../../public/arrowDown.png";
import arrowDown2 from "../../../public/arrowDown2.png";
import avatar from "../../../public/avatar.png";
import linkedin from "../../../public/linkedin.png";
import github from "../../../public/github.png";
import instagram from "../../../public/instagram.png";
import twitter from "../../../public/twitter.png";

const BlogPost = ({ post, data }) => {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);

  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.mainContainer}>
      <Nav />
      <div className={styles.container}>
        {/* // SIDE ARROW  */}
        <div className={styles.arrowSideContainer}>
          <div
            className={styles.arrowSide}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            {isShown && (
              <Link href="/#content">
                <a>
                  <Image
                    src={arrowDown2}
                    alt="Arrow down"
                    width={42}
                    height={28}
                  />
                </a>
              </Link>
            )}
            {!isShown && (
              <Image src={arrowDown} alt="Arrow down" width={42} height={28} />
            )}
          </div>
        </div>
        <div className={styles.mainGrid}>
          {/* // MAIN CONTENT  */}
          <div>
            <div className={styles.content}>
              <p className={styles.pSmall}>
                {(() => {
                  const d = dateParts(post.posted_at);
                  return `${d.month} ${d.day}, ${d.year}`;
                })()}
              </p>
              <h1 className={styles.displayLg}>{post.title}</h1>
              <h1>{post.subtitle}</h1>
              <ReactMarkdown className={styles.articleContent}>
                {post.content}
              </ReactMarkdown>
            </div>
            {/* // YOU MIGHT ALSO LIKE  */}
            <div className={styles.recommended}>
              <h1>You might also like</h1>
              {data.slice(0, 3).map((article, index) => (
                <div key={index} className={styles.likeCard}>
                  <h5>{article.authorName}</h5>
                  <Link href={`/articles/${article.slug}`}>
                    <h2>{article.title}</h2>
                  </Link>
                  <h4>{article.subtitle}</h4>
                  <p>
                    {(() => {
                      const d = dateParts(article.posted_at);
                      return `${d.month} ${d.day}, ${d.year}`;
                    })()}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* // SIDE BAR  */}
          <div className={styles.sideGrid}>
            {/* // AUTHOR */}
            <div className={styles.author}>
              <div className={styles.avatar}>
                <Image
                  className={styles.avatar__letters}
                  src={avatar}
                  alt="Student Avatar"
                />
              </div>
              <h5>{post.authorName}</h5>
              <p>
                I'm a student at the Reykjavík Academy of Web Development. I
                like programming and designing.
              </p>
            </div>
            {/* // MORE FROM THE AUTHOR */}
            <div className={styles.more}>
              <h4>
                More from&nbsp;
                {post.authorName}
              </h4>
              {/* Get more from author */}
              {data
                .flatMap((article) =>
                  article.authorName === post.authorName ? article : []
                )
                .slice(0, 3)
                .map((article, index) => (
                  <div key={index} className={styles.moreCard}>
                    <p>
                      {(() => {
                        const d = dateParts(article.posted_at);
                        return `${d.month} ${d.day}, ${d.year}`;
                      })()}
                    </p>
                    <Link href={`/articles/${article.slug}`}>
                      <h4>{article.title}</h4>
                    </Link>
                    <div className={styles.tagContainer}>
                      <button className={styles.buttonTag}>Tag</button>
                      <button className={styles.buttonTag}>Tag</button>
                    </div>
                  </div>
                ))}
              <div className={styles.socialContainer}>
                <h4>
                  Follow&nbsp;
                  {post.authorName}
                </h4>
                <div className={styles.imgContainer}>
                  <div className={styles.img}>
                    <Image src={github} alt="Github Icon" />
                  </div>
                  <div className={styles.img}>
                    <Image src={twitter} alt="Twitter Icon" />
                  </div>
                  <div className={styles.img}>
                    <Image src={instagram} alt="Instagram Icon" />
                  </div>
                  <div className={styles.img}>
                    <Image src={linkedin} alt="Linkedin Icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getStaticPaths() {
//   const { data: posts } = await horsemernAPI.get("/articles");

//   const paths = posts.data.map((post) => ({
//     params: { id: post._id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  const { data: articles } = await horsemernAPI.get(`/articles/`);
  const post = articles.data.find((article) => article.slug === params.slug);
  const publishedArticles = articles.data.filter(
    (article) => article.published
  );

  return {
    props: { post, data: publishedArticles },
  };
}

export default BlogPost;
