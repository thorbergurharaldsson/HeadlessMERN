import { Link } from "react-router-dom";

import Logo from "../../../../components/logo/Logo";
import { useStores } from "../../../../stores";
import "./Layout.scss";

export default function Layout({ children }) {
	const { userStore } = useStores();
	return (
		<div className="layout">
			<div className="sidebar">
				<Logo />

				<div className="sidebar__links">
					<Link to="/studio/articles">Articles</Link>
					<Link to="/studio/assignments">Assignments</Link>
				</div>
				<div className="sidebar__user">
					<p>{userStore.name}</p>
				</div>
			</div>
			<div className="content">{children}</div>
		</div>
	);
}
