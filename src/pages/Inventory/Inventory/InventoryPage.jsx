import React from "react";
import "./InventoryPage.css";
import MainInven from "./MainInven";
import { useRecoilState } from "recoil";
import { isModalOpenState } from "./InventoryModal";
import HeaderMain from "../../../components/views/Header/HeaderMain/HeaderMain";

const InventoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
    // 모달창 열렸을 때 배경
    const isModalOpenBackground = isModalOpen
    ? "rgba(0, 0, 0, 0.1)"
    : '';

    const handleIsModalOpen = () =>{
      if(isModalOpen){
        setIsModalOpen(false);
      }
    }
  return (
    <div className="inven-wrapper-background" style={{ backgroundColor: isModalOpenBackground }} onClick={()=>handleIsModalOpen()}>
      <HeaderMain/>
        <div className="inven-wrapper">
            <MainInven />
        </div>
    </div>
  );
};

export default InventoryPage;
