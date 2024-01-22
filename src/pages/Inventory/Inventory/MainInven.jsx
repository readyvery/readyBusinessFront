import React, { useEffect, useState } from "react";
import close from "../../../assets/icons/icon_closeModal.svg";
import downArrow from "../../../assets/icons/icon_downArrow.svg";
import upArrow from "../../../assets/icons/icon_upArrow.svg";
import cherry from "../../../assets/icons/small_cherry.svg";
import InvenBox from "../../../components/views/Inven/InvenBox";
import "./MainInven.css";
import { isModalOpenState } from "./InventoryModal";
import { useRecoilState } from "recoil";

function MainInven() {
  const [category, setCategory] = useState("전체");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [isSoldOutModalOpen, setIsSoldOutModalOpen] = useState(false);
  const [isCancleModalOpen, setIsCancleModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [invenList, setInvenList] = useState([
    {
      category: "음료",
      foodies: [
        { idx: 1, name: "콜라", soldOut: false },
        { idx: 2, name: "오렌지주스를먹어봐요", soldOut: true },
      ],
    },
    {
      category: "과자자자ㅏ자자자자",
      foodies: [
        { idx: 3, name: "맛동산", soldOut: false },
        { idx: 4, name: "사또밥", soldOut: true },
      ],
    },
    {
      category: "카레",
      foodies: [],
    },
  ]);
  useEffect(() => {
    setInvenList([
      {
        category: "음료",
        foodies: [
          { idx: 1, name: "콜라", soldOut: false },
          { idx: 2, name: "오렌지주스를먹어봐요", soldOut: true },
        ],
      },
      {
        category: "과자자자ㅏ자자자자",
        foodies: [
          { idx: 3, name: "맛동산", soldOut: false },
          { idx: 4, name: "사또밥", soldOut: true },
        ],
      },
      {
        category: "카레",
        foodies: [],
      },
    ]);
  }, []); // 빈 배열을 두어 컴포넌트가 처음 로드될 때만 실행되도록 함
  
  // 모달창 열렸을 때 배경
  const isModalOpenBackground = isModalOpen
  ? "rgba(0, 0, 0, 0.1)"
  : '';

  useEffect(() => {
    const uniqueCategories = [...new Set(invenList.map(item => item.category))];
    setCategoryList(["전체", ...uniqueCategories]);
    console.log(invenList);
  }, [invenList]);

  const chnCategory = (e) => {
    setCategory(e);
    setIsCategoryOpen((prev) => !prev);
  }
// handleModal : 모달창 열리게
  const handleModal = (idx, soldOut) => {
    setIsModalOpen(true);
    if (soldOut) {
      setIsSoldOutModalOpen(false);
      setIsCancleModalOpen((prev) => !prev);
    } else {
      setIsCancleModalOpen(false);
      setIsSoldOutModalOpen((prev) => !prev);
    }
  };

  // handIsSoldOutModal : 품절처리 모달창 닫기
  const handIsSoldOutModal = () => {
    setIsSoldOutModalOpen(false);
    setIsModalOpen(false);
  };

  // handIsCanclOutModal : 품절 취소 처리 모달창 닫기
  const handIsCanclOutModal = () => {
    setIsCancleModalOpen(false);
    setIsModalOpen(false);
  };

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
      <div className="mainInven-wrapper" style={{ backgroundColor: isModalOpenBackground }}>
        <div className="mainInven-title">재고관리</div>
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
                <span onClick={() => chnCategory(e)}>{e}</span>
                <div className="mainInven-category__line"></div>
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="mainInven-category-content__wrapper">
          {invenList
            .filter(
              (cate) => category === "전체" || cate.category === category
            )
            .map((categoryItem) =>
              categoryItem.foodies.map((foodItem) => (
                <React.Fragment key={foodItem.idx}>
                  <InvenBox
                    handleModal={() =>
                      handleModal(foodItem.idx, foodItem.soldOut)
                    }
                    invenProps={{
                      category: categoryItem.category,
                      name: foodItem.name,
                      soldOut: foodItem.soldOut,
                    }}
                  />
                </React.Fragment>
              ))
            )}
        </div>
      </div>

      { isSoldOutModalOpen &&
        isModalOpen && (
          <div className="inven-modal-wrapper">
            <div className="inven-modal-box">
              <div
                className="inven-modal-close__wrapper"
                onClick={() => handIsSoldOutModal()}
              >
                <img src={close} alt="close" />
              </div>
              <div className="inven-modal-box-img__wrapper">
                <img src={cherry} alt="cherry" />
              </div>
              <div className="inven-modal-box-txt__wrapper">
                <div className="inven-modal-box-txt">품절 처리 시</div>
                <div className="inven-modal-box-txt">
                  고객님은 해당 메뉴를 주문할 수 없습니다.
                </div>
              </div>
              <div className="inven-modal-box-close-btn__wrapper">
                <div className="inven-modal-box-close-btn" id="accept">
                  확인
                </div>
              </div>
            </div>
          </div>
        )}

      {!isSoldOutModalOpen &&
        isCancleModalOpen &&
        isModalOpen && (
          <div className="inven-modal-wrapper">
            <div className="inven-modal-box">
              <div
                className="inven-modal-close__wrapper"
                onClick={() => handIsCanclOutModal()}
              >
                <img src={close} style={{width:"1.5rem", height:"1.5rem"}}alt="close" />
              </div>
              <div className="inven-modal-box-img__wrapper">
                <img src={cherry} alt="cherry" />
              </div>
              <div className="inven-modal-box-txt__wrapper">
                <div className="inven-modal-box-txt">
                  품절 처리를 취소하시겠습니까?
                </div>
              </div>
              <div className="inven-modal-box-close-btn__wrapper">
                <div className="inven-modal-box-close-btn" id="cancle">
                  확인
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default MainInven;
