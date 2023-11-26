import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedState, loginState } from "../../Atom/status";
import kakao from "../../assets/icons/icon_kakao.svg";
import readyvery from "../../assets/icons/img_readyVery.svg";

import "./MainMypage.css";

const MainMypage = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [, , removeCookies] = useCookies();
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

  const fetchData = async () => {
    // const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/info`);
    // console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    const config = {
      withCredentials: true,
    };

    axios
      .get(apiUrl + "/api/v1/user/logout", config)
      .then((response) => {
        console.log(response);
        setIsAuthenticated(false);
        setIsLoggedIn({
          accessToken: null,
          expiredTime: null,
        });
        navigate("/");
        removeCookies("accessToken");
        removeCookies("JSESSIONID");
        window.localStorage.setItem("isAuthenticated", false);
      })
      .catch((error) => {
        alert("관리자에게 문의하세요.");
        navigate("/");
      });
  };

  return (
    <div className="mypage-main__wrapper">
      <div className="mypage-top__wrapper">
        <div className="mypage-top__box">
          <div className="mypage-top-txt__wrapper">
            <span className="mypage-top__txt">오늘도 준비된</span>
            <div className="mypage-top-cafe__txt">
              <span>오르다커피</span> 사장님
            </div>
          </div>
          <div className="mypage-kakao__wrapper">
            <div>
              <img src={readyvery} alt="readyvery" />
            </div>
            <div className="mypage-kakao__txt">
              <span style={{ color: "#000" }}>레디베리 상담</span>
              <span>매일 00:00 ~ 24:00</span>
            </div>
            <div className="mypage-kakao-img__box">
              <img src={kakao} alt="kakao" />
            </div>
          </div>
        </div>

        <div className="mypage__line"></div>

        <div className="mypage-content__wrapper">
          <p>기본 정보</p>
          <div className="mypage-content__box">
            <div>
              <span className="mypage-content__title">가게명</span>
              <span className="mypage-content__txt">오르다커피</span>
            </div>

            <div>
              <span className="mypage-content__title">가게주소</span>
              <span className="mypage-content__txt">
                경기 부천시 지봉로 46 백호빌딩 2층
              </span>
            </div>

            <div>
              <span className="mypage-content__title">매장 연락처</span>
              <span className="mypage-content__txt">0507-1358-6887</span>
            </div>

            <div>
              <span className="mypage-content__title">영업시간</span>
              <span className="mypage-content__txt">
                평일 08:40-23:00 / 토요일 11:00-22:00 / 일요일 휴무
              </span>
            </div>

            <div>
              <span className="mypage-content__title">등록 계좌번호</span>
              <span className="mypage-content__txt">
                KB국민은행 22930104331825
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mypage-logout__wrapper" onClick={handleLogout}>
        <span>로그아웃</span>
      </div>
    </div>
  );
};

export default MainMypage;
