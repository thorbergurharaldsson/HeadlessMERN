import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/Header";

export default function Article() {
	const params = useParams();

	const [article, setArticle] = useState({});
	useEffect(() => {
		const getArticle = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/articles/${params.id}`
			);
			const { data } = await response.json();

			setArticle(data);
		};

		getArticle();
	}, []);

	return (
		<div>
			<Header />
			<h1>{article.title}</h1>
      <h2>{article.subtitle}</h2>
      <h3>{article.author}</h3>
      <h3>{article.posted_at}</h3>
      <p>{article.content}</p>
		</div>
	);
}
