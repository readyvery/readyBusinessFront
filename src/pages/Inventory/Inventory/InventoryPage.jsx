import React, { useState, useEffect } from "react";
import "./InventoryPage.css";
import MainInven from "./MainInven";
import HeaderMain from "../../../components/views/Header/HeaderMain/HeaderMain"
import icon_parkOutline from "../../../assets/icons/icon_parkOutline.svg";


const InventoryPage = () => {
  // 480시 헤더 대신 사용할 뒤로 가기 버튼
  const BackButtonHeader =()=>{
    // 접속 기록 상의 뒤
    // 일정 페이지로의 이동을 바랄 경우 수정필요
    const handleGoBack = () => {
      window.history.back();
    };
    return(
      <div className="inven-wrapper-header-top-back-button-style">
        <img src={icon_parkOutline} alt="parkOutline" onClick={() => handleGoBack()}/>
      </div>
    )
  }
  // 480일 경우 재고관리에서는 헤더 사용 X
  const ResponsiveHeader=()=> {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
  
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []); 
    return windowWidth <= 480 ? <BackButtonHeader/> : <HeaderMain />;
  }

  return (
    <div className="inven-wrapper-background">
      <ResponsiveHeader/>
      <main className="inven-wrapper">
        <MainInven />
      </main>
    </div>
  );
};

export default InventoryPage;
