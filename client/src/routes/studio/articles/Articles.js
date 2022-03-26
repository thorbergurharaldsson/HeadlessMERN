/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProtectedRoute from "../../../utils/protectedRoute";
import { useAuth } from "../../../utils/authContext";
import { horsemernAPI } from "../../../utils/api";
import dateParts from "../../../utils/dateParts";
import Table from "../components/table/Table";

import "./Articles.scss";

function Articles() {
  const { user } = useAuth();

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles();
  }, [user]);

  const getArticles = async () => {
    const response = horsemernAPI.get("/articles");
    const data = (await response).data.data;
    const filteredArticles = data.filter(
      (article) => article.author === user._id
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
    await fetch(
      `${process.env.REACT_APP_HORSEMERN_API}/articles/${article._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(updatedArticle),
      }
    );
  };

  const deleteArticle = async (article) => {
    horsemernAPI.delete(`/articles/${article._id}`);
    window.location.reload(false);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <h5>Articles</h5>
            </th>
            <th></th>
            <th className="p3">View</th>
            <th className="p3">Edit</th>
            <th className="p3">Delete</th>
            <th className="p3">Publish</th>
          </tr>
        </thead>
        <tbody>
          {articles?.map((article) => (
            <Table
              key={article.slug}
              title={article.title}
              date={(() => {
                const d = dateParts(article.posted_at);
                return `${d.month} ${d.day}, ${d.year}`;
              })()}
              published={article.published}
              type="article"
              deleteFunc={() => deleteArticle(article)}
              editUrl={`/studio/articles/${article?._id}`}
              viewUrl={`/studio/articles/${article?._id}`}
              publishFunc={() =>
                updateArticle(
                  article.published
                    ? updateArticle(false, article)
                    : updateArticle(true, article)
                )
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProtectedRoute(Articles);
