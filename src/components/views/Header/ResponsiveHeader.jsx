import React, { useState, useEffect } from "react";
import Header480 from "./Header480/Header480";
import HeaderMain from "./HeaderMain/HeaderMain";

function ResponsiveHeader() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 창 너비가 바뀔 때마다 windowWidth 상태 업데이트
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트 될 때 리사이즈 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 빈 의존성 배열로 마운트될 때만 실행

  // windowWidth에 따라 조건부 렌더링
  return windowWidth <= 480 ? <Header480 /> : <HeaderMain />;
}

export default ResponsiveHeader;
