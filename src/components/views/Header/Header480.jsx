import menu from "../../../assets/icons/Header/ic_round-menu.svg";
import logo from "../../../assets/icons/Header/LOGO.svg";

export default function Header480() {
  return (
    <header className="header480">
      <img src={menu} alt="menu" />
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header__menu">
        <img src={menu} alt="menu" />
      </div>
    </header>
  );
}
