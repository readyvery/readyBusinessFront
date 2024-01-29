import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/views/Footer/Footer";
import HeaderBack480 from "../../components/views/Header/Header480/HeaderBack480/HeaderBack480";
import HeaderMain from "../../components/views/Header/HeaderMain/HeaderMain";
import MainMypage from "./MainMypage";
import "./Mypage.css";
function Mypage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState(location.pathname);
  useEffect(() => {
      setSelectedIcon(location.pathname);
  }, [location.pathname]); //주소 변경마다 업데이트

  // 화면별 네비바 포인트
  const getIconStyle = (path) => {
      const selected = selectedIcon.endsWith(path);
      return { selected };
  };

  return (
    <div className="mypage-wrapper-background">
      {/* 480일 경우 재고관리에서는 헤더 사용 X */}
      <HeaderMain />
      <HeaderBack480 pageName="마이페이지" />
      <main className="mypage-wrapper">
        <div className="mypage-top-toggle-box-wrapper">
          <ul className="mypage-top-toggle-box">
          <li
              className={getIconStyle("/mypage").selected ? "select" : ""}
              onClick={() => navigate("/mypage")}
            >
              기본정보
            </li>
            {/* 추후 디자인 나오면 경로 연결 */}
            <li className={getIconStyle("/device").selected ? "select" : ""}>
              기기관리
            </li>
            <li className={getIconStyle("/stamp").selected ? "select" : ""}>
              스탬프 관리
            </li>
          </ul>
        </div>
        {/* outlet으로 대체하기 */}
        <MainMypage />
      </main>
      <Footer />
    </div>
  );
}

export default Mypage;
