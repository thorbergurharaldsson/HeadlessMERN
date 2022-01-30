import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArticleForm from "../components/article-form/ArticleForm";

export default function NewArticle() {
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [article, setArticle] = useState({
		author: "Tryggvi",
		title: "",
		content: "",
	});

	const saveArticle = async () => {
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
