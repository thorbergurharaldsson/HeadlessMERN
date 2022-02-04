import headerStyles from "../styles/Header.module.css";

const Header = () => {
  // const x = 5 -> conditionnals 26:27 in Tuto
  return (
    <div>
      <h1 className={headerStyles.title}>Studio Live .</h1>
      <p className={headerStyles.subtitle}>From the Headless HorseMERN</p>
    </div>
  );
};

export default Header;
