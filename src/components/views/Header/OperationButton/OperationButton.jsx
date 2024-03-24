import { useState } from "react";
import { useRecoilValue } from "recoil";
import { storeContextState } from "../../../../Atom/status";
import useFetchStoreStatus from "../../../../hooks/Main/useFetchStoreStatus";
import useStoreStatusChange from "../../../../hooks/Main/useStoreStatusChange";
import Modal from "../../Modal/Modal";
import "./OperationButton.css";

const OperationButton = () => {
  // const [isOperation, setIsOperation] = useRecoilState(storeState); //영업상태
  const storeStatus = useRecoilValue(storeContextState);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 여부
  const [modalTitle, setModalTitle] = useState("");

  const storeStatusChange = useStoreStatusChange(); // 영업 상태 변경
  useFetchStoreStatus(); // 영업 상태 fetching

  const handleOperation = () => {
    setIsModalOpen(true); // 영업 상태 변경 버튼 클릭 시 모달을 표시
    setModalTitle(
      !storeStatus ? "영업을 시작하시겠습니까?" : "영업을 종료하시겠습니까?"
    );
  };

  const handleCancle = () => {
    setIsModalOpen(false); // 모달 닫기 (영업 상태 변경 없음)
  };

  const handleCheck = async () => {
    await storeStatusChange(!storeStatus);
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="loginControl-wrapper-css">
      <span className="business-status">
        {!storeStatus ? "영업종료" : "영업중"}
      </span>
      <div
        className={`loginControl-button-wrapper-css ${
          !storeStatus ? "open" : ""
        }`}
        onClick={() => handleOperation()}
      >
        {!storeStatus ? (
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
