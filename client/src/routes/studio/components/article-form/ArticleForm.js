/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backBtnIcon from "../../../../img/Icon/BackBtn.svg";
import dateParts from "../../../../utils/dateParts";

import "./ArticleForm.scss";

export default function ArticleForm(props) {
  const { article, updateArticle, saveArticle, deleteArticle, message } = props;

  // if (article.title != "" && article.subtitle != "" && article.content != "") {
  //   setInterval(saveArticle, 5000);
  // }

  const [updatedAt, setUpdatedAt] = useState("");

  const updatedDate = async () => {
    const d = dateParts(await article.updated_at);
    if (d === undefined) return;
    setUpdatedAt(
      `${d.month} ${d.day}, ${d.year} - ${d.hour}:${d.minute}:${d.second}`
    );
  };

  useEffect(async () => {
    updatedDate();
  }, [article, updateArticle]);

  return (
    <>
      <Link to="/studio/articles" className="backBtn">
        <img src={backBtnIcon} alt="Back button" />
      </Link>
      <div className="article-form">
        <h2>
          const{" "}
          <span style={{ color: "var(--secondary-color)" }}>newArticle =</span>
        </h2>
        <div className="title">
          <input
            value={article.title || ""}
            placeholder="Title"
            onChange={(e) => updateArticle("title", e.target.value)}
          />
        </div>
        <div className="subtitle">
          <input
            value={article.subtitle || ""}
            placeholder="Subtitle"
            onChange={(e) => updateArticle("subtitle", e.target.value)}
          />
        </div>
        <textarea
          className="content"
          value={article.content}
          placeholder="Article content"
          onChange={(e) => {
            updateArticle("content", e.target.value);
          }}
        />
        <p className="p3">{updatedAt}</p>
        <div className="footer">
          <span>{message}</span>

          <div className="buttons">
            <button className="save-button" onClick={saveArticle}>
              {window.location.pathname === "/studio/articles/new-article"
                ? "Publish"
                : "Update"}
            </button>
            <button className="delete-button" onClick={deleteArticle}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
