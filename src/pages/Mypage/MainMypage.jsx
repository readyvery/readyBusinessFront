import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedState, loginState } from "../../Atom/status";
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
      withCredentials: true,
    };

    axios
      .get(`${apiUrl}/api/v1/user/info`, config)
      .then((res) => {
        console.log(res);
        setCafeInfo(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (cookies?.accessToken) {
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
  console.log(cafeInfo);
  // 위는 서버 연결
  const MypageMainContentBox = ({ label, children }) => {
    return (
      <div className="mypage-main">
        <label className="mypage-main-content-box">{label}</label>
        <div className="mypage-main-content-box-children">{children}</div>
      </div>
    );
  };
  const MypageMainContentBoxInput = ({ id, type, value, day }) => {
    if (type === "tel") {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1 - $2 - $3");
    }
    return (
      <div id={id} type={type} className="mypage-main-content-box-text">
        {day ? (
          <>
            <span>({day})</span>
            {value}
          </>
        ) : (
          value
        )}
      </div>
    );
  };
  return (
    <div className="mypage-main-wrapper">
      <MypageMainContentBox label={"아이디"}>
        <MypageMainContentBoxInput
          id="storeName"
          type={"text"}
          value="오르다 커피"
        />
      </MypageMainContentBox>
      <MypageMainContentBox label={"매장 전화번호"}>
        <MypageMainContentBoxInput
          id="storeNumber"
          type={"tel"}
          value={"01047501096"}
        />
      </MypageMainContentBox>
      <MypageMainContentBox label={"매장 주소"}>
        <MypageMainContentBoxInput
          id="storePostAddressNum"
          type={"number"}
          value={"14672"}
        />
        <MypageMainContentBoxInput
          id="storePostAddressTxt"
          type={"text"}
          value={"역곡동 35"}
        />
        <MypageMainContentBoxInput
          id="storePostAddressTxtDetail"
          type={"text"}
          value={"경기 부천시 원미구 지봉로 46"}
        />
      </MypageMainContentBox>
      <MypageMainContentBox label={"영업시간 및 휴무일"}>
        <MypageMainContentBoxInput
          day="평일"
          id="storeOpenTime"
          type={"text"}
          value={"월~금 10:00 - 22:00"}
        />
        <MypageMainContentBoxInput
          day="토요일"
          id="storeOpenTime"
          type={"text"}
          value={"10:00 - 22:00"}
        />
        <MypageMainContentBoxInput
          day="일요일"
          id="storeOpenTime"
          type={"text"}
          value={"10:00 - 22:00"}
        />
        <MypageMainContentBoxInput
          day="휴무일"
          id="storeOpenTime"
          type={"text"}
          value={"연중무휴"}
        />
      </MypageMainContentBox>
      <MypageMainContentBox label={"계좌번호"}>
        <MypageMainContentBoxInput
          id="storeBank"
          type={"text"}
          value={"KB국민은행"}
        />
        <MypageMainContentBoxInput
          id="storeBankAccount"
          type={"number"}
          value={"22930104331825"}
        />
      </MypageMainContentBox>
      {/* <div className="mypage-top__wrapper">
        <div className="mypage-top__box">
          <div className="mypage-top-txt__wrapper">
            <span className="mypage-top__txt">오늘도 준비된</span>
            <div className="mypage-top-cafe__txt">
              <span>{cafeInfo?.storeName}</span> 사장님
            </div>
          </div>
          <div className="mypage-kakao__wrapper">
            <div>
              <img src={readyvery} alt="readyvery" />
            </div>
            <div className="mypage-kakao__txt">
              <span style={{ color: "#000" }}>레디베리 상담</span>
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
              <span className="mypage-content__txt">{cafeInfo?.account}</span>
            </div>
          </div>
        </div>
      </div> */}

      <div className="mypage-logout__wrapper" onClick={handleLogout}>
        <span>로그아웃</span>
      </div>
    </div>
  );
});

export default MainMypage;
