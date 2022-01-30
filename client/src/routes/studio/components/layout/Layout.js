import { Link } from "react-router-dom";

import Logo from "../../../../components/logo/Logo";
import "./Layout.scss";

export default function Layout({ children }) {
	return (
		<div className="layout">
			<div className="sidebar">
				<Logo />

				<div className="sidebar__links">
					<Link to="/studio">Dashboard</Link>
					<Link to="/studio/articles">Articles</Link>
					<Link to="/studio/assignments">Assignments</Link>
				</div>
			</div>
			<div className="content">{children}</div>
		</div>
	);
}
