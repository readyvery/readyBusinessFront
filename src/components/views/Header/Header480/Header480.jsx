import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/icons/Header/LOGO.svg";
import menu from "../../../../assets/icons/Header/ic_round-menu.svg";
import SideMenu from "../../SideMenu/SideMenu";
import OperationButton from "../OperationButton/OperationButton";
import "./Header480.css";

export default function Header480() {
  const navigate = useNavigate();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const handleSidebar = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <>
      <SideMenu isOpen={isSideMenuOpen} toggleSidebar={handleSidebar} />
      <header className="header480">
        <img
          src={menu}
          alt="menu"
          className="header480__menu"
          onClick={handleSidebar}
        />
        <img
          src={logo}
          alt="logo"
          className="header__logo"
          onClick={() => navigate(`/main`)}
        />
        <div style={{ marginLeft: "auto" }}>
          <OperationButton />
        </div>
      </header>
    </>
  );
}
