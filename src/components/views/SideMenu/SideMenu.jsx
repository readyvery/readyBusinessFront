import React from "react";
import "./SideMenu.css";
import logo from "../../../assets/icons/Header/LOGO.svg";
import X from "../../../assets/icons/X.svg";

const SideMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={isOpen ? "side-menu open" : "side-menu"}>
      <div className="side-menu__close" onClick={toggleSidebar}>
        <img src={X} alt="X" />
      </div>

      <div>
        <img src={logo} alt="logo" className="side-menu__logo" />
      </div>

      <div className="side-menu__sale">매출관리</div>
      <div className="side-menu__store">매장관리</div>
      <div className="side-menu__inventory">재고관리</div>
      <div className="side-menu__customer">고객관리(준비중)</div>

      <div className="side-menu__notice">공지사항</div>
      <div className="side-menu__cs-center">고객센터</div>
      <div className="side-menu__guide">레디베리 가이드</div>
      <div className="side-menu__mypage">마이페이지</div>
    </div>
  );
};

export default SideMenu;
