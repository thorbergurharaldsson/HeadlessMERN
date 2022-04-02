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
      <div className="header">
        <div className="header__logo">
          <Logo />
        </div>

        {window.location.pathname !== "/studio/articles" &&
        window.location.pathname !== "/studio/assignments" ? null : (
          <div className="header__links">
            <div className="header__link">
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
              <p>Your Articles</p>
            </div>
            <div className="header__link">
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
              <p>Your Projects</p>
            </div>
          </div>
        )}

        <div className="header__user">
          <p>
            <span className="p_b">Hello </span>
            {user.name}
          </p>
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
