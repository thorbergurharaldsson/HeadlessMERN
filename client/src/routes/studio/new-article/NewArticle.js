import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/authContext";

import ArticleForm from "../components/article-form/ArticleForm";

export default function NewArticle() {
  const user = useAuth();

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [article, setArticle] = useState({
    author: user.id,
    title: "",
    content: "",
  });

  const saveArticle = async () => {
    console.log(user);
    console.log(user);
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/articles`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(article),
      }
    );

    const { data, message } = await response.json();

    setMessage(message);
    if (response.status === 200) {
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
