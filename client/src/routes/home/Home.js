import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProtectedRoute from "../../utils/protectedRoute";

import Header from "../../components/header/Header";

import "./Home.scss";

function Home() {
  const [articles, setArticles] = useState([]);
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    getArticles();
    getAssignments();
  }, []);

  const getArticles = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/articles`
    );
    const { data } = await response.json();

    const publishedArticles = data.filter((article) => article.published);
    setArticles(publishedArticles);
  };

  const getAssignments = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/assignments`
    );
    const data = await response.json();

    setAssignments(data);
  };

  return (
    <div>
      <Header />
      <div className="section">
        <div className="section__header">
          <h1>Articles</h1>
        </div>
        {articles?.map((article) => (
          <div className="section__body" key={article._id}>
            <Link
              className="section__body__title"
              to={`/article/${article._id}`}
            >
              {article?.title}
            </Link>
            <h3>{article?.subtitle}</h3>
            <h3>{article?.author}</h3>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section__header">
          <h1>Assignments</h1>
        </div>
        {assignments?.map((assignment) => (
          <div className="section__body" key={assignment._id}>
            <h3 className="section__body__title">{assignment?.title}</h3>
            <h3>{assignment?.author}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProtectedRoute(Home)