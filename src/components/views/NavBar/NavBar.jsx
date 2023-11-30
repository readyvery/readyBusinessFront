import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilCallback, useRecoilState } from "recoil";
import { storeState } from "../../../Atom/status";
import Home from "../../../assets/icons/Navbar/Home.svg"; //홈
import Inven from "../../../assets/icons/Navbar/Inven.svg"; //재고관리
import Mypage from "../../../assets/icons/Navbar/Mypage.svg"; //마이페이지
import Sales from "../../../assets/icons/Navbar/Sales.svg"; //매출관리
import "../NavBar/NavBar.css";
import StoreBtn from "./StoreBtn";

const NavBar = () => {
  const currentPath = window.location.pathname; // 현재 경로 가져오기
  // const apiUrl = process.env.REACT_APP_API_ROOT;
  const [Store] = useRecoilState(storeState); // 영업여부
  const setStoreState = useRecoilCallback(({ set }) => async () => {
    console.log(Store, storeState);
    set(storeState, !Store);
  });
  const onClickHandler = (e) => {
    setStoreState();
    // axios
    //   .post(`${apiUrl}+/api/v1/store/sales`)
    //   .then((Store) => {
    //     console.log(Store);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <div className="navbar">
      <div className="navbarMenu">
        <Link to="/home" style={{'textDecoration': 'none'}}>
          {currentPath === "/home" ? (
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

        <Link to="/Inventory" style={{'textDecoration': 'none'}}>
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
        </Link>

        <Link to="/Sales" style={{'textDecoration': 'none'}}>
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
        </Link>

        <Link to="/Mypage" style={{'textDecoration': 'none'}}>
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
        </Link>
      </div>

      {/* <Link style={{'textDecoration': 'none'}}>
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
      </Link> */}
      <StoreBtn />
    </div>
  );
};

export default React.memo(NavBar);
