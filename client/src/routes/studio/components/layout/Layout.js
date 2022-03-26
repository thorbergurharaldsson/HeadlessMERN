import { Link } from "react-router-dom";
import Logo from "../../../../components/logo/Logo";
import { useAuth } from "../../../../utils/authContext";
import "./Layout.scss";
import articlesIcon from "../../../../img/Icon/Articles.svg";
import selArticlesIcon from "../../../../img/Icon/ArticlesSel.svg";
import projectsIcon from "../../../../img/Icon/Projects.svg";
import selProjectsIcon from "../../../../img/Icon/ProjectsSel.svg";

export default function Layout({ children }) {
  const { user } = useAuth();
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="sidebar__logo">
          <Logo />
        </div>

        <div className="sidebar__links">
          <div className="sidebar__link">
            <Link to="/studio/articles">
              <img
                src={
                  window.location.pathname === "/studio/articles"
                    ? selArticlesIcon
                    : articlesIcon
                }
                alt="Articles"
              ></img>
            </Link>
            <p>Articles</p>
          </div>
          <div className="sidebar__link">
            <Link to="/studio/assignments">
              <img
                src={
                  window.location.pathname === "/studio/assignments"
                    ? selProjectsIcon
                    : projectsIcon
                }
                alt="Assignments"
              ></img>
            </Link>
            <p>Projects</p>
          </div>
        </div>
        <div className="sidebar__user">
          <h6>Hello {user.name}</h6>
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
