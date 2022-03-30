import styles from "../../styles/Articles.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import dateParts from "../../utils/dateParts";
import ReactMarkdown from "react-markdown";

import Nav from "../../components/Nav/Nav";

import Image from "next/image";
import arrowDown from "../../../public/arrowDown.png";
import arrowDown2 from "../../../public/arrowDown2.png";
import linkedin from "../../../public/linkedin.png";
import github from "../../../public/github.png";
import instagram from "../../../public/instagram.png";
import twitter from "../../../public/twitter.png";

const BlogPost = ({ post }) => {
  // to change the arrow on hover
  const [isShown, setIsShown] = useState(false);

  const { data } = useSWR("/assignments", fetcher);
  // console.log(data);
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.mainContainer}>
      <Nav />
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
      <div className={styles.parent}>
        <div className={styles.article}>
          <div className={styles.main}>
            <p>{post.updatedAt}</p>
            <h1 className={styles.title}>{post.assignmentTitle}</h1>
            <h4 className={styles.subtitle}>{post.moduleTitle}</h4>
            <ReactMarkdown className={styles.articleContent}>
              {post.description}
            </ReactMarkdown>
          </div>
        </div>

        <div className={styles.recommended}>
          <h2 className={styles.recommendedTitle}>You might also like</h2>
          {data.data.slice(0, 3).map((article, index) => (
            <div key={index} className={styles.cardSmall}>
              <div>
                <p className={styles.recommendedP}>{article.author}</p>
              </div>
              <Link href={`/assignments/${article._id}`}>
                <h3 className={styles.recommendedh3}>
                  {article.assignmentTitle}
                </h3>
              </Link>
              <h5 className={styles.recommendedh4}>{article.subtitle}</h5>
              <p className={styles.recommendedP}>{article.moduleTitle}</p>
            </div>
          ))}
        </div>
        <div>
          <div className={styles.author}>
            <div className={styles.avatar}>
              <div className={styles.avatar__letters}> FU </div>
            </div>
            <p className={styles.authorName}>{post.author}</p>
            <p className={styles.authorBio}>
              this is me. I like pc and various things, like coding and love
              makings
            </p>
          </div>
          <div className={styles.more}>
            <p className={styles.moreHeader}>
              More from <br />
              {post.author}
            </p>
            {data.data.slice(0, 3).map((article, index) => (
              <div key={index} className={styles.moreCont}>
                <p className={styles.moreP}>
                  {(() => {
                    const d = dateParts(article.updatedAt);
                    return `${d.month} ${d.day}, ${d.year}`;
                  })()}
                </p>
                <Link href={`/assignments/${article._id}`}>
                  <h5 className={styles.moreTitle}>
                    {article.assignmentTitle}
                  </h5>
                </Link>
                <div className={styles.tagContainer}>
                  <button className={styles.buttonTag}>Tag</button>
                  <button className={styles.buttonTag}>Tag</button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.more}>
            <p className={styles.moreHeader}>
              Follow <br />
              {post.author}
            </p>
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
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignments`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/assignments/${params.id}`
  );
  const post = await res.json();

  return {
    props: { post },
  };
}

export default BlogPost;
