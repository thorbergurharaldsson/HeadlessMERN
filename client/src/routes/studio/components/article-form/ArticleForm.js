import { Link } from "react-router-dom";
import Switch from "../switch/Switch";

import "./ArticleForm.scss";

export default function ArticleForm(props) {
	const { article, updateArticle, saveArticle, deleteArticle, message } = props;

	return (
		<div className="article-form">
			<Link to="/studio/articles">Back</Link>
			<div className="title">
				<input
					value={article.title || ""}
					onChange={(e) => updateArticle("title", e.target.value)}
				/>
				<label>
					<span>Publish</span>
					<Switch
						onChange={(e) => updateArticle("published", e)}
						checked={!!article.published}
					/>
				</label>
			</div>
			<div className="subtitle">
				<input
					value={article.subtitle || ""}
					onChange={(e) => updateArticle("subtitle", e.target.value)}
				/>
				<div>{article.posted_at}</div>
			</div>
			<textarea
				className="content"
				value={article.content}
				onChange={(e) => updateArticle("content", e.target.value)}
			/>
			<div className="footer">
				<span>{message}</span>

				<div className="buttons">
					<button className="save-button" onClick={saveArticle}>
						Save
					</button>
					<button className="delete-button" onClick={deleteArticle}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
