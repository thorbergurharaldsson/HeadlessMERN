import styles from "./Main.module.scss";

import Link from "next/link";

const Main = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
