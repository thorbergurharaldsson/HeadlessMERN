import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Studio Live .</h1>
      <p className={styles.subtitle}>From the Headless HorseMERN</p>
    </div>
  );
};

export default Header;
