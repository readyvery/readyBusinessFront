import { Link } from "react-router-dom";
import menu from "../../../../assets/icons/Header/ic_round-menu.svg";
import logo from "../../../../assets/icons/Header/LOGO.svg";
import SideMenu from "../../SideMenu/SideMenu";
import "./Header480.css";
import { useState } from "react";
import Modal from "../../Modal/Modal";

export default function Header480() {
  const [isOperation, setIsOperation] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 여부 상태 추가
  const [modalTitle, setModalTitle] = useState("");

  const handleOperation = () => {
    setIsModalOpen(true); // 영업 상태 변경 버튼 클릭 시 모달을 표시
    setModalTitle(
      isOperation ? "영업을 시작하시겠습니까?" : "영업을 종료하시겠습니까?"
    );
  };

  const handleCancle = () => {
    setIsModalOpen(false); // 모달 닫기 (영업 상태 변경 없음)
  };

  const handleCheck = () => {
    setIsOperation(!isOperation);
    setIsModalOpen(false); // 모달 닫기
  };

  const handleSidebar = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const isOperationBackground = isOperation
    ? "rgba(131, 131, 131, 1)"
    : "rgba(216, 35, 86, 1)";

  return (
    <>
      <SideMenu isOpen={isSideMenuOpen} toggleSidebar={handleSidebar} />
      <header className="header480">
        <img
          src={menu}
          alt="menu"
          className="header480__menu"
          onClick={handleSidebar}
        />
        <Link to="/main">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>

        <span className="business-status">
          {isOperation ? "영업종료" : "영업중"}
        </span>
        <div
          className="loginControl-button-wrapper-css"
          onClick={() => handleOperation()}
          style={{ backgroundColor: isOperationBackground }}
        >
          {isOperation ? (
            <div className="loginControl-button-isopen-css"></div>
          ) : (
            <div className="loginControl-button-isclose-css"></div>
          )}
        </div>
      </header>

      {isModalOpen && (
        <Modal
          handleCancle={handleCancle}
          handleCheck={handleCheck}
          title={modalTitle}
        />
      )}
    </>
  );
}
