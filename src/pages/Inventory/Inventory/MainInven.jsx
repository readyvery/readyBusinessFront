import React, { useEffect, useState } from "react";
import InvenList from "../../../components/views/Inven/InvenList/InvenList";
import InvenListColumnName from "../../../components/views/Inven/InvenListColumnName/InvenListColumnName";
import InvenSoldOutModal from "../../../components/views/Inven/InvenSoldOutModal/InvenSoldOutModal";
import useInventoryFetchData from "../../../hooks/Inventory/useInventoryFetchData";
import useInventoryPatchData from "../../../hooks/Inventory/useInventoryPatchData";
import "./MainInven.css";

function MainInven() {
  // 화면의 크기가 480보디 작은지 확인
  // 품절처리 모달에서 \n이 다르기 때문에 이를 확인하기 위해 정의
  const isMobile = window.innerWidth >= 480;
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

  const handleCategoryModal = () => {
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

  return (
    <>
      <div className="mainInven-wrapper">
        {/* 재고관리 title의 경우 headerBack에서*/}
        <InvenListColumnName
          category={category}
          isCategoryOpen={isCategoryOpen}
          HandleIsCategoryOpen={handleCategoryModal}
        />

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
        <InvenSoldOutModal
          contenttxt={
            isMobile ? (
              <>
                품절 처리 시 <br /> 고객님은 해당 메뉴를 주문할 수 없습니다.
              </>
            ) : (
              <>
                품절 처리 시 고객님은 <br /> 해당 메뉴를 주문할 수 없습니다.
              </>
            )
          }
          requestid="accept"
          handleIsCloseModal={handleIsCloseModal}
          handlePatchData={handlePatchData}
        />
      )}

      {isCancleModalOpen && isModalOpen && (
        <InvenSoldOutModal
          contenttxt="품절 처리를 취소하시겠습니까?"
          requestid="cancle"
          handleIsCloseModal={handleIsCloseModal}
          handlePatchData={handlePatchData}
        />
      )}
    </>
  );
}

export default MainInven;
