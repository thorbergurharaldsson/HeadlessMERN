import Nav from "../Nav/Nav";

import Main from "../Main/Main";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <Nav />
      <Main>{children}</Main>
    </div>
  );
};

export default Layout;
