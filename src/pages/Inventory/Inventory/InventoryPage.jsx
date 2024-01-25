import React from "react";
import Footer from "../../../components/views/Footer/Footer";
import HeaderBackButton480 from "../../../components/views/Header/Header480/HeaderBackButton480/HeaderBackButton480";
import HeaderMain from "../../../components/views/Header/HeaderMain/HeaderMain";
import "./InventoryPage.css";
import MainInven from "./MainInven";

const InventoryPage = () => {
  // 480시 헤더 대신 사용할 뒤로 가기 버튼
  return (
    <div className="inven-wrapper-background">
      {/* 480일 경우 재고관리에서는 헤더 사용 X */}
      <HeaderBackButton480 />
      <HeaderMain />
      <main className="inven-wrapper">
        <MainInven />
      </main>
      <Footer />
    </div>
  );
};

export default InventoryPage;
