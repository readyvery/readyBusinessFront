import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/images";
import "./SideMenu.css";

const SideMenu = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className={isOpen ? "side-menu open" : "side-menu"}>
      <div className="side-menu__close" onClick={toggleSidebar}>
        <img src={IMAGES.check_x_gray} alt="X" />
      </div>

      <div>
        <img src={IMAGES.logo} alt="logo" className="side-menu__logo" />
      </div>

      <div className="side-menu__sale" onClick={() => navigate(`/sales`)}>
        매출관리
      </div>
      <div className="side-menu__store" onClick={() => navigate(`/store`)}>
        매장관리
      </div>
      <div
        className="side-menu__inventory"
        onClick={() => navigate(`/inventory`)}
      >
        재고관리
      </div>
      <div className="side-menu__customer">고객관리(준비중)</div>

      <div className="side-menu__notice">공지사항</div>
      <Link
        to="http://pf.kakao.com/_ZxiEjG/chat"
        style={{ textDecoration: "none" }}
      >
        <div className="side-menu__cs-center">고객센터</div>
      </Link>
      <div className="side-menu__guide">레디베리 가이드</div>
      <div className="side-menu__mypage" onClick={() => navigate(`/mypage`)}>
        마이페이지
      </div>
    </div>
  );
};

export default SideMenu;
