import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedState, loginState } from "../../Atom/status";
import kakao from "../../assets/icons/icon_kakao.svg";
import readyvery from "../../assets/icons/img_readyVery.svg";

import "./MainMypage.css";

const MainMypage = React.memo(() => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [, , removeCookie] = useCookies(["accessToken", "JSESSIONID"]);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const [cafeInfo, setCafeInfo] = useState({});

  const [cookies] = useCookies(["accessToken"]);

  const fetchData = () => {
    const config = {
      withCredentials: true
    };

    axios.get(`${apiUrl}/api/v1/user/info`, config)
      .then((res) => {
        console.log(res);
        setCafeInfo(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if(cookies?.accessToken){
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        removeCookie("accessToken", { domain: process.env.REACT_APP_DOMAIN });
        removeCookie("JSESSIONID", { domain: process.env.REACT_APP_DOMAIN });
        // window.localStorage.setItem("isAuthenticated", false);
        message.success("로그아웃에 성공하셨습니다.");
        navigate("/");
      })
      .catch((error) => {
        message.info("관리자에게 문의하세요.");
        navigate("/");
      });
  };

  const handleKaKao = () => {
    window.location.href = "http://pf.kakao.com/_ZxiEjG/chat";
  }

  return (
    <div className="mypage-main__wrapper">
      <div className="mypage-top__wrapper">
        <div className="mypage-top__box">
          <div className="mypage-top-txt__wrapper">
            <span className="mypage-top__txt">오늘도 준비된</span>
            <div className="mypage-top-cafe__txt"><span>{cafeInfo?.storeName}</span> 사장님</div>
          </div>
          <div className="mypage-kakao__wrapper">
            <div>
              <img src={readyvery} alt="readyvery" />
            </div>
            <div className="mypage-kakao__txt">
              <span style={{ 'color': '#000' }}>레디베리 상담</span>
              <span>매일 09:00 ~ 18:00</span>
            </div>
            <div className="mypage-kakao-img__box" onClick={handleKaKao}>
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
              <span className="mypage-content__txt">{cafeInfo?.storeName}</span> 
            </div>

            <div>
              <span className="mypage-content__title">가게주소</span>
              <span className="mypage-content__txt">{cafeInfo?.address}</span>
            </div>

            <div>
              <span className="mypage-content__title">매장 연락처</span>
              <span className="mypage-content__txt">{cafeInfo?.phone}</span> 
            </div>

            <div>
              <span className="mypage-content__title">영업시간</span>
              <span className="mypage-content__txt">{cafeInfo?.openTime}</span>
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
});

export default MainMypage;
