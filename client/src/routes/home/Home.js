import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/header/Header";

export default function Home() {
	const [articles, setArticles] = useState([]);
	useEffect(() => {
		getArticles();
	}, []);

	const getArticles = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_SERVER}/articles`
		);
		const { data } = await response.json();

		const publishedArticles = data.filter((article) => article.published);
		setArticles(publishedArticles);
	};

	return (
		<div>
			<Header />
			<div className="title">
				<h1>Articles</h1>
			</div>
			{articles?.map((article) => (
				<div className="article" key={article._id}>
					<div>
						<Link to={`/article/${article._id}`}>{article?.title}</Link>
						<h3>{article?.subtitle}</h3>
            <h3>{article?.author}</h3>
					</div>
				</div>
			))}
		</div>
	);
}
