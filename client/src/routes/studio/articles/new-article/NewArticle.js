import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { horsemernAPI } from "../../../../utils/api";
import { useAuth } from "../../../../utils/authContext";
import ProtectedRoute from "../../../../utils/protectedRoute";
import ArticleForm from "../../components/article-form/ArticleForm";

function NewArticle() {
  const { user } = useAuth();
  console.log(user);

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [article, setArticle] = useState({
    author: user._id,
    title: "",
    content: "",
  });

  const saveArticle = async () => {
    // const response = await fetch(
    //   `${process.env.REACT_APP_HORSEMERN_API}/articles`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8", // Indicates the content
    //     },
    //     body: JSON.stringify(article),
    //   }
    // );

    const { data, status } = await horsemernAPI.post("/articles", article);

    setMessage(message);
    if (status === 200) {
      navigate(`/studio/articles/${data._id}`);
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
