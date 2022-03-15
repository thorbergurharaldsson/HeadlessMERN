import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProtectedRoute from "../../../utils/protectedRoute";
import Switch from "../components/switch/Switch";
import { useAuth } from "../../../utils/authContext";

import "./Articles.scss";

function Articles() {
  const { user } = useAuth();

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles();
  }, [user]);

  const getArticles = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/articles`
    );
    const { data } = await response.json();
    const filteredArticles = data.filter(
      (article) => article.author == user.id
    );
    setArticles(filteredArticles);
  };

  const updateArticle = async (published, article) => {
    const updatedArticle = {
      ...article,
      published,
    };
    const updatedArticles = articles.map((a) =>
      a._id === article._id ? updatedArticle : a
    );

    setArticles(updatedArticles);

    await fetch(`${process.env.REACT_APP_API_SERVER}/articles/${article._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(updatedArticle),
    });
  };

  const deleteArticle = async (article) => {
    await fetch(`${process.env.REACT_APP_API_SERVER}/articles/${article._id}`, {
      method: "DELETE",
    });

    getArticles();
  };

  return (
    <div className="article-list">
      <div className="title">
        <h1>Your Articles</h1>
        <Link to="/studio/articles/new-article">
          <button className="new-article">New</button>
        </Link>
      </div>
      {articles?.map((article) => (
        <div className="article" key={article._id}>
          <div>
            <h2>{article?.title}</h2>
            <h3>{article?.subtitle}</h3>
          </div>
          <div className="actions">
            <Link to={`/studio/articles/${article?._id}`}>
              <button className="edit-button">Edit</button>
            </Link>
            <button
              className="delete-button"
              onClick={() => deleteArticle(article)}
            >
              Delete
            </button>
            <Switch
              onChange={(value) => updateArticle(value, article)}
              checked={!!article.published}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProtectedRoute(Articles);
