import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Logo from "../../../../components/logo/Logo";
import getUserInfo from "../../../../stores/getUserInfo";
import "./Layout.scss";

export default function Layout({ children }) {
  const [user, setUser] = useState({
    name: "",
    id: "",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const userInfo = await getUserInfo();

    setUser(userInfo);
  }, []);

  return (
    <div className="layout">
      <div className="sidebar">
        <Logo />

        <div className="sidebar__links">
          <Link to="/studio/articles">Articles</Link>
          <Link to="/studio/assignments">Assignments</Link>
        </div>
        <div className="sidebar__user">
          <p>{user.name}</p>
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
