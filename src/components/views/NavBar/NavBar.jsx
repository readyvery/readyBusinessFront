import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Nav } from "react-bootstrap";
import { useRecoilCallback, useRecoilState } from "recoil";
import { storeState } from "../../../Atom/status";
import Home from "../../../assets/icons/Navbar/Home.svg"; //홈
import Inven from "../../../assets/icons/Navbar/Inven.svg"; //재고관리
import Mypage from "../../../assets/icons/Navbar/Mypage.svg"; //마이페이지
import Sales from "../../../assets/icons/Navbar/Sales.svg"; //매출관리
import StoreOn from "../../../assets/icons/Navbar/Store.svg"; //영업중
import "../NavBar/NavBar.css";

const NavBar = () => {
  const currentPath = window.location.pathname; // 현재 경로 가져오기

  const [Store] = useRecoilState(storeState); // 영업여부
  const setStoreState = useRecoilCallback(({ set }) => async () => {
    set(storeState, !Store);
  });
  const onClickHandler = (e) => {
    setStoreState();
  };

  return (
    <div className="navbar">
      <div className="navbarMenu">
        <Nav.Link href="/">
          {currentPath === "/" ? (
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
        </Nav.Link>

        <Nav.Link href="/Inventory">
          {currentPath === "/Inventory" ? (
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
        </Nav.Link>

        <Nav.Link href="/Sales">
          {currentPath === "/Sales" ? (
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
        </Nav.Link>

        <Nav.Link href="/Mypage">
          {currentPath === "/Mypage" ? (
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
        </Nav.Link>
      </div>

      <Nav.Link>
        {Store ? (
          <div className="icon-group">
            <img
              className="icon"
              onClick={onClickHandler}
              src={StoreOn}
              alt="Open"
            />
            <span className="menu-font">영업중</span>
          </div>
        ) : (
          <div className="icon-off">
            <img
              className="icon"
              onClick={onClickHandler}
              src={StoreOn}
              alt="Close"
            />
            <span className="menu-font">영업종료</span>
          </div>
        )}
      </Nav.Link>
    </div>
  );
};

export default NavBar;
