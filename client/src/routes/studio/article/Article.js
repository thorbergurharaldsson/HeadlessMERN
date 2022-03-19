import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProtectedRoute from "../../../utils/protectedRoute";
import ArticleForm from "../components/article-form/ArticleForm";

function Article() {
  const params = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState({});
  useEffect(() => {
    const getArticle = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HORSEMERN_API}/articles/${params.id}`
      );
      const { data } = await response.json();

      setArticle(data);
    };

    getArticle();
  }, []);

  useEffect(() => {
    saveArticle();
  }, [article.published]);

  const saveArticle = async () => {
    await fetch(
      `${process.env.REACT_APP_HORSEMERN_API}/articles/${params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(article),
      }
    );
  };

  const deleteArticle = async () => {
    await fetch(
      `${process.env.REACT_APP_HORSEMERN_API}/articles/${params.id}`,
      {
        method: "DELETE",
      }
    );

    navigate("/studio/articles");
  };

  const updateArticle = (key, value) => {
    setArticle({
      ...article,
      [key]: value,
    });
  };

  return (
    <ArticleForm
      saveArticle={saveArticle}
      deleteArticle={deleteArticle}
      updateArticle={updateArticle}
      article={article}
    />
  );
}

export default ProtectedRoute(Article);
