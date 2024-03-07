import { useState } from "react";
import { useRecoilState } from "recoil";
import { storeState } from "../../../../Atom/status";
import Modal from "../../Modal/Modal";
import "./OperationButton.css";

const OperationButton = () => {
  const [isOperation, setIsOperation] = useRecoilState(storeState); //영업상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 여부
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
    setIsOperation((prev) => !prev);
    setIsModalOpen(false); // 모달 닫기
  };
  return (
    <div className="loginControl-wrapper-css">
      <span className="business-status">
        {isOperation ? "영업종료" : "영업중"}
      </span>
      <div
        className={`loginControl-button-wrapper-css ${
          isOperation ? "open" : ""
        }`}
        onClick={() => handleOperation()}
      >
        {isOperation ? (
          <div className="loginControl-button-isopen-css"></div>
        ) : (
          <div className="loginControl-button-isclose-css"></div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          handleCancle={handleCancle}
          handleCheck={handleCheck}
          title={modalTitle}
        />
      )}
    </div>
  );
};
export default OperationButton;
