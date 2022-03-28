import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProtectedRoute from "../../../utils/protectedRoute";
import ArticleForm from "../components/article-form/ArticleForm";
import { horsemernAPI } from "../../../utils/api";

function Article() {
  const params = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState({});

  useEffect(() => {
    const getArticle = async () => {
      const { data } = await horsemernAPI.get(`/articles/${params.id}`);
      setArticle(data.data);
    };
    getArticle();
  }, []);

  useEffect(() => {
    updateArticle();
  }, [article.published]);

  const saveArticle = async () => {
    await horsemernAPI.patch(`/articles/${params.id}`, article);
    setTimeout(window.location.reload(false), 100);
  };

  const deleteArticle = async () => {
    await horsemernAPI.delete(`/articles/${params.id}`);

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
