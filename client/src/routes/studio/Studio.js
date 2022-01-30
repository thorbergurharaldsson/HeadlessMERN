import { Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import Articles from "./articles/Articles";
import Assignments from "./assignments/Assignments";
import Layout from "./components/layout/Layout";
import Article from "./article/Article";
import NewArticle from "./new-article/NewArticle";

const Studio = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="articles/new-article" element={<NewArticle />} />
				<Route path="articles/:id" element={<Article />} />
				<Route path="articles" element={<Articles />} />
				<Route path="assignments" element={<Assignments />} />
			</Routes>
		</Layout>
	);
};

export default Studio;
