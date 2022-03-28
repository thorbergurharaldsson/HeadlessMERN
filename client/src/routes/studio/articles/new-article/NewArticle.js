import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { horsemernAPI } from "../../../../utils/api";
import { useAuth } from "../../../../utils/authContext";
import ProtectedRoute from "../../../../utils/protectedRoute";
import ArticleForm from "../../components/article-form/ArticleForm";

function NewArticle() {
  const { user } = useAuth();

  console.log(user.name);

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [article, setArticle] = useState({
    author: user._id,
    authorName: user.name,
    title: "",
    content: "",
  });

  const saveArticle = async () => {
    const { data, status } = await horsemernAPI.post("/articles", article);

    console.log(data.data._id);

    setMessage(message);
    if (status === 200) {
      console.log("article saved " + JSON.stringify(article));
      navigate(`/studio/articles/${data.data._id}`);
    }
  };

  const deleteArticle = async () => {
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
      message={message}
    />
  );
}

export default ProtectedRoute(NewArticle);
