import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Home from "../../../assets/icons/Navbar/Home.svg"; //홈
import Inven from "../../../assets/icons/Navbar/Inven.svg"; //재고관리
import Mypage from "../../../assets/icons/Navbar/Mypage.svg"; //마이페이지
import Sales from "../../../assets/icons/Navbar/Sales.svg"; //매출관리
import "../NavBar/NavBar.css";
import StoreBtn from "./StoreBtn";

const NavBar = () => {
  let location = useLocation();

  return (
    <div className="navbar">
      <div className="navbarMenu">
        <Link to="/home" style={{ textDecoration: "none" }}>
          {location.pathname === "/home" ? (
            <div className="icon-group">
              <img className="icon" src={Home} alt="HomeOn" />
              <span className="menu-font">홈</span>
            </div>
          ) : (
            <div className="icon-off">
              <img className="icon" src={Home} alt="HomeOff" />
              <span className="menu-font">홈</span>
            </div>
          )}
        </Link>

        <Link to="/Inventory" style={{ textDecoration: "none" }}>
          {location.pathname === "/Inventory" ? (
            <div className="icon-group">
              <img className="icon" src={Inven} alt="InvenOn" />
              <span className="menu-font">재고관리</span>
            </div>
          ) : (
            <div className="icon-off">
              <img className="icon" src={Inven} alt="InvenOff" />
              <span className="menu-font">재고관리</span>
            </div>
          )}
        </Link>

        <Link to="/Sales" style={{ textDecoration: "none" }}>
          {location.pathname === "/Sales" ? (
            <div className="icon-group">
              <img className="icon" src={Sales} alt="SalesOn" />
              <span className="menu-font">매출관리</span>
            </div>
          ) : (
            <div className="icon-off">
              <img className="icon" src={Sales} alt="SalesOff" />
              <span className="menu-font">매출관리</span>
            </div>
          )}
        </Link>

        <Link to="/Mypage" style={{ textDecoration: "none" }}>
          {location.pathname === "/Mypage" ? (
            <div className="icon-group">
              <img className="icon" src={Mypage} alt="MypageOn" />
              <span className="menu-font">마이페이지</span>
            </div>
          ) : (
            <div className="icon-off">
              <img className="icon" src={Mypage} alt="MypageOff" />
              <span className="menu-font">마이페이지</span>
            </div>
          )}
        </Link>
      </div>

      <StoreBtn />
    </div>
  );
};

export default NavBar;
