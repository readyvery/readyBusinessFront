import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Home from "../../../assets/icons/Navbar/Home.svg"; //홈
import Inven from "../../../assets/icons/Navbar/Inven.svg"; //재고관리
import Mypage from "../../../assets/icons/Navbar/Mypage.svg"; //마이페이지
import Sales from "../../../assets/icons/Navbar/Sales.svg"; //매출관리
import StoreOn from "../../../assets/icons/Navbar/Store.svg"; //영업중
import "../NavBar/NavBar.css";

const NavBar = () => {
  const currentPath = window.location.pathname; // 현재 경로 가져오기

  const [Store, setStore] = useState(1); // 영업여부
  const onClickHandler = (e) => {
    setStore((prevStore) => {
      setStore(!prevStore);
    });
  };

  return (
    <div className="navbar">
      <div className="navbarMenu">
        <Nav.Link href="/">
          {currentPath === "/" ? (
            <div className="icon-group">
              <img className="icon" src={Home} alt="HomeOn" />
              <span className="font">홈</span>
            </div>
          ) : (
            <div className="icon-off">
              <img className="icon" src={Home} alt="HomeOff" />
              <div className="font">홈</div>
            </div>
          )}
        </Nav.Link>

        <Nav.Link href="/Inventory">
          {currentPath === "/Inventory" ? (
            <div className="icon-group">
              <img className="icon" src={Inven} alt="InvenOn" />
              <div className="font">재고관리</div>
            </div>
          ) : (
            <div className="icon-off">
              <img className="icon" src={Inven} alt="InvenOff" />
              <div className="font">재고관리</div>
            </div>
          )}
        </Nav.Link>

        <Nav.Link href="/Sales">
          {currentPath === "/Sales" ? (
            <div className="icon-group">
              <img className="icon" src={Sales} alt="SalesOn" />
              <div className="font">매출관리</div>
            </div>
          ) : (
            <div className="icon-off">
              <img className="icon" src={Sales} alt="SalesOff" />
              <div className="font">매출관리</div>
            </div>
          )}
        </Nav.Link>

        <Nav.Link href="/Mypage">
          {currentPath === "/Mypage" ? (
            <div className="icon-group">
              <img className="icon" src={Mypage} alt="MypageOn" />
              <div className="font">마이페이지</div>
            </div>
          ) : (
            <div className="icon-off">
              <img className="icon" src={Mypage} alt="MypageOff" />
              <div className="font">마이페이지</div>
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
            <div className="font">영업중</div>
          </div>
        ) : (
          <div className="icon-off">
            <img
              className="icon"
              onClick={onClickHandler}
              src={StoreOn}
              alt="Close"
            />
            <div className="font">영업종료</div>
          </div>
        )}
      </Nav.Link>
    </div>
  );
};

export default NavBar;
