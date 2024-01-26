import React, { useEffect, useState } from "react";
import close from "../../../assets/icons/icon_closeModal.svg";
import downArrow from "../../../assets/icons/icon_downArrow.svg";
import upArrow from "../../../assets/icons/icon_upArrow.svg";
import cherry from "../../../assets/icons/small_cherry.svg";
import InvenList from "../../../components/views/Inven/InvenList";
import useInventoryFetchData from "../../../hooks/Inventory/useInventoryFetchData";
import useInventoryPatchData from "../../../hooks/Inventory/useInventoryPatchData";
import "./MainInven.css";

function MainInven() {
  const [category, setCategory] = useState("전체");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); //품절모달창에 대한 내용
  const [isSoldOutModalOpen, setIsSoldOutModalOpen] = useState(false); //품절처리모달인지
  const [isCancleModalOpen, setIsCancleModalOpen] = useState(false); //처리 취소모달인지
  const [currentBox, setCurrentBox] = useState({
    idx: 0,
    soldOut: false,
  });
  const [categoryList, setCategoryList] = useState([]); //서버에서 받은 카테고리 및 아이템 값(전체)
  const [invenList, setInvenList] = useState([]); //서버에서 받은 카테고리 및 아이템 값(선택된)

  // 통신부
  const { fetchData, isCategoryList, isInvenList } = useInventoryFetchData();
  const { patchData } = useInventoryPatchData();
  // 서버의 재고값 연동
  useEffect(() => {
    setCategoryList(isCategoryList);
    setInvenList(isInvenList);
  }, [isInvenList, isCategoryList]);

  // 품절처리 모달 patch 기능

  const handlePatchData = async () => {
    await patchData(currentBox);
    fetchData(); // patch후 fetch를 통해 값을 갱신
    handleIsCloseModal();
  };

  // 카테고리 변경
  const chnCategory = (e) => {
    setCategory(e);
    setIsCategoryOpen((prev) => !prev);
  };

  // handleModal : 품절 조절 모달창 열리게
  const handleModal = (idx, soldOut) => {
    console.log(idx, !soldOut);
    if (isSoldOutModalOpen || isCancleModalOpen) {
      setIsSoldOutModalOpen(false);
      setIsCancleModalOpen(false);
      setIsModalOpen(false);
      return;
    }

    setIsModalOpen(true);

    if (soldOut) {
      setIsCancleModalOpen((prev) => !prev);
    } else {
      setIsSoldOutModalOpen((prev) => !prev);
    }

    setCurrentBox({
      idx: idx,
      soldOut: !soldOut,
    });

    fetchData();
  };

  // handleIsSoldOutModal : 품절 조절 모달창 닫기
  const handleIsCloseModal = () => {
    setIsSoldOutModalOpen(false);
    setIsCancleModalOpen(false);
    setIsModalOpen(false);
  };

  //외부 요소 클릭시 카테고리 모달 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      const layerPopup = document.querySelector(".mainInven-category__modal");
      if (layerPopup && !layerPopup.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isCategoryOpen]);

  // 품절 관리 모달창
  const SoldOutModal = ({ titletxt, contenttxt, requestid }) => {
    return (
      <div className="inven-modal-wrapper">
        <div className="inven-modal-box">
          <div
            className="inven-modal-close__wrapper"
            onClick={() => {
              handleIsCloseModal();
            }}
          >
            <img src={close} alt="close" />
          </div>
          <div className="inven-modal-box-wrapper">
            <div className="inven-modal-box-img__wrapper">
              <img src={cherry} alt="cherry" />
            </div>
            <div className="inven-modal-box-txt__wrapper">
              <div className="inven-modal-box-txt">{titletxt}</div>
              <div className="inven-modal-box-txt">{contenttxt}</div>
            </div>
          </div>
          <div className="inven-modal-box-close-btn__wrapper">
            <div
              className="inven-modal-box-close-btn"
              id={requestid}
              onClick={(e) => handlePatchData(e)}
            >
              확인
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="mainInven-wrapper">
        {/* <div className="mainInven-title">재고관리</div> */}
        <div className="mainInven-title__wrapper">
          <span className="mainInven-title__span1">품절</span>
          <div
            className="mainInven-title__span2__wrapper"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          >
            <span style={{ width: "1.125rem" }}></span>
            <span
              className="mainInven-title__span2"
              onClick={() => setIsCategoryOpen((prev) => !prev)}
            >
              {category}
            </span>
            {isCategoryOpen ? (
              <span>
                <img src={downArrow} alt="downArrow" />
              </span>
            ) : (
              <span>
                <img src={upArrow} alt="upArrow" />
              </span>
            )}
          </div>
          <span className="mainInven-title__span3">상품명</span>
        </div>

        {isCategoryOpen && (
          <div className="mainInven-category__modal">
            {categoryList?.map((e, i) => (
              <React.Fragment key={i}>
                <span key={i} onClick={() => chnCategory(e)}>
                  {e}
                </span>
                <div className="mainInven-category__line"></div>
              </React.Fragment>
            ))}
          </div>
        )}
        <InvenList
          category={category}
          invenList={invenList}
          handleModal={handleModal}
        />
      </div>

      {isSoldOutModalOpen && isModalOpen && (
        <SoldOutModal
          titletxt="품절 처리 시 고객님은"
          contenttxt="해당 메뉴를 주문할 수 없습니다."
          requestid="accept"
        />
      )}

      {isCancleModalOpen && isModalOpen && (
        <SoldOutModal
          titletxt=" "
          contenttxt="품절 처리를 취소하시겠습니까?"
          requestid="cancle"
        />
      )}
    </>
  );
}

export default MainInven;
