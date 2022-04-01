import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "../../utils/api";

import styles from "../../styles/Articles.module.scss";
import { FaSearch } from "react-icons/fa";

function Articles() {
  const [id, setID] = useState();
  const { data } = useSWR("/articles", fetcher);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  if (!data) return <div>Loading...</div>;

  // to get coords to pass it into another API to get the weather
  const getID = async (id) => {
    // console.log(id);
    setID(id);
  };

  const searchArticles = async (str, data) => {
    const searchStr = str.toLowerCase();
    const filteredArticles = data.data.filter(
      (article) =>
        article.title.toLowerCase().includes(searchStr) ||
        article.authorName.toLowerCase().includes(searchStr)
    );
    if (searchStr.length > 2) {
      setSearchData(filteredArticles);
    } else {
      setSearchData([]);
    }
  };

  const renderSearchData = () => {
    return searchData.map((article, index) => (
      <p key={index} className={styles.searchRes}>
        <Link href={`/articles/${article._id}`}>{article.title}</Link>
      </p>
    ));
  };

  const displayArticles = (articles) => {
    const htmlString = articles.filter((article) => {
      if (searchTerm == "") {
        return article;
      } else if (
        article.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return article;
      }
    });
    articleList.innerHTML = htmlString;
  };

  // loadArticles()

  return (
    <>
      <div className={styles.btnCont}>
        <div className={styles.space}></div>
        <div className={styles.space}></div>
        <div className={styles.space}></div>

        <input
          className={styles.searchTxt}
          type="text"
          name="searchbar"
          id="searchBar"
          placeholder="Search..."
          onChange={(e) => {
            searchArticles(e.target.value, data);
          }}
        />
        <div className={styles.resultCont}>
          {searchData && <ul>{renderSearchData()}</ul>}
          <ul id="articleList"></ul>
        </div>

        <div className={styles.space}></div>
        <Link href="/">
          <a>
            <button className={styles.buttonSmall}>Browse by</button>
          </a>
        </Link>
        <div className={styles.space}></div>
        <div className={styles.space}></div>
        <div className={styles.space}></div>
      </div>

      <div className={styles.main}>
        <div className={styles.spacingLeft}>
          {data.data.map((article, index) => (
            <div key={index} className={styles.container}>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <div className={styles.authorContainer}>
                    <p>{article.authorName}</p>
                    <p className={styles.pSmall}>{article.posted_at}</p>
                  </div>
                  <h1 className={styles.title}>{article.title}</h1>
                  <h4 className={styles.subtitle}>{article.subtitle}</h4>
                  <p className={styles.pSmall}>{article.content}</p>
                  <div className={styles.space}></div>
                  <div className={styles.space}></div>
                  <Link href={`/articles/${article._id}`}>
                    <button className={styles.buttonSmall}>View article</button>
                  </Link>
                  {/* <button onClick={(e) => getID(e.target.value)}>
                            <option value={article._id}>Button</option>
                        </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Articles;
