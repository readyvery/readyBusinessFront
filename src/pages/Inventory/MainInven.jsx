import React, { useEffect, useState } from "react";
import close from "../../assets/icons/icon_closeModal.svg";
import downArrow from "../../assets/icons/icon_downArrow.svg";
import upArrow from "../../assets/icons/icon_upArrow.svg";
import cherry from "../../assets/icons/small_cherry.svg";
import InvenBox from "../../components/views/Inven/InvenBox";
import "./MainInven.css";


function MainInven () {
  const [category, setCategory] = useState("전체");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryList = ["전체", "커피", "논커피", "티", "에이드", "프라페", "스무디", "마카롱", "아이스크림", "와플", "크로플", "베이커리"];
  const chnMenu = () => setIsCategoryOpen(!isCategoryOpen);

  const chnCategory = (e) => {
    setCategory(e);
    setIsCategoryOpen((prev) => !prev);
  }

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
    
    // /api/v1/inventory [patch]
    // /api/v1/inventory [get]
  }

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
  }, []);

  const invenList = {
    "category" : [
        {
            "name" : "커피",
            "foodies" : [
                {
                  "idx" : 123,
                  "name": "아메리카노",
                  "soldOut" : true,
  
                },
                {
                  "idx" : 133,
                  "name": "라떼",
                  "soldOut" : false,
  
                },
            ],
  
        },
        {
            "name" : "티",
            "foodies" : [
                {
                  "idx" : 124,
                  "name": "녹차",
                  "soldOut" : true,
  
                },
                {
                  "idx" : 143,
                  "name": "홍차",
                  "soldOut" : false,
  
                },
            ],
  
        },
        {
            "name" : "에이드",
            "foodies" : [
                {
                  "idx" : 125,
                  "name": "망고 에이드",
                  "soldOut" : true,
  
                },
                {
                  "idx" : 153,
                  "name": "청포도 에이드",
                  "soldOut" : false,
  
                },
            ],
  
        },
        {
            "name" : "프라페",
            "foodies" : [
                {
                  "idx" : 126,
                  "name": "오레오 프라페",
                  "soldOut" : true,
  
                },
                {
                  "idx" : 163,
                  "name": "초코 프라페",
                  "soldOut" : false,
  
                },
            ],
  
        },
        {
            "name" : "스무디",
            "foodies" : [
                {
                  "idx" : 127,
                  "name": "무화과 스무디",
                  "soldOut" : true,
  
                },
                {
                  "idx" : 173,
                  "name": "망고 스무디",
                  "soldOut" : false,
  
                },
            ],
  
        },
        {
            "name" : "마카롱",
            "foodies" : [
                {
                  "idx" : 128,
                  "name": "앙버터 마카롱",
                  "soldOut" : true,
  
                },
                {
                  "idx" : 183,
                  "name": "로투스 마카롱",
                  "soldOut" : false,
  
                },
            ],
  
        },
    ],
  };

  return (
    <div className="mainInven-wrapper">
      <div className="mainInven-title__wrapper">
        <span className="mainInven-title__span1">품절</span>
        <div className="mainInven-title__span2__wrapper" onClick={chnMenu}>
          <span style={{ 'width': '1.125rem' }}></span>
          <span className="mainInven-title__span2">{category}</span>
          {isCategoryOpen ? (<span><img src={downArrow} alt="downArrow"/></span>) : (<span><img src={upArrow} alt="upArrow"/></span>)}
        </div>
        <span className="mainInven-title__span3">상품명</span>
      </div>

      {isCategoryOpen && (
          <div className="mainInven-category__modal">
            {categoryList.map((e, i) => (
              <>
                <span key={i} onClick={() => chnCategory(e)}>{e}</span>
                <div className="mainInven-category__line"></div>
              </>
            ))}
          </div>
        )}

      <div className="mainInven-category-content__wrapper">
        {invenList.category
          .filter((cate) => category === "전체" || cate.name === category)
          .map((categoryItem) => 
            categoryItem.foodies.map((foodItem) => (
              <div key={foodItem.idx}>
                <InvenBox 
                  handleModal={handleModal} 
                  invenProps={{ 
                    category: categoryItem.name, 
                    name: foodItem.name,
                    soldOut: foodItem.soldOut
                  }}
                />
              </div>
            )
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-wrapper">
          <div className="modal-box">
            <div className="modal-close__wrapper" onClick={handleModal}>
              <img src={close} alt="close"/>
            </div>
            <div className="modal-box-img__wrapper"><img src={cherry} alt="cherry" /></div>
            <div className="modal-box-txt__wrapper">
              <div className="modal-box-txt">품절 처리 시</div>
              <div className="modal-box-txt">고객님은 해당 메뉴를 주문할 수 없습니다.</div>
            </div>
            <div className="modal-box-close-btn__wrapper">
              <div className="modal-box-close-btn" onClick={handleModal}>확인</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainInven;
