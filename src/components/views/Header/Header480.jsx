import menu from "../../../assets/icons/Header/ic_round-menu.svg";
import logo from "../../../assets/icons/Header/LOGO.svg";
import "./Header480.css";

export default function Header480() {
  return (
    <header className="header480">
      <img src={menu} alt="menu" className="header480__menu" />
      <img src={logo} alt="logo" className="header__logo" />
      <span className="business-status">영업종료</span>
    </header>
  );
}
