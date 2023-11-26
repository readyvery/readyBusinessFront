import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import close from "../../assets/icons/icon_closeModal.svg";
import downArrow from "../../assets/icons/icon_downArrow.svg";
import upArrow from "../../assets/icons/icon_upArrow.svg";
import cherry from "../../assets/icons/small_cherry.svg";
import InvenBox from "../../components/views/Inven/InvenBox";
import "./MainInven.css";


function MainInven () {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [category, setCategory] = useState("전체");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const chnMenu = () => setIsCategoryOpen(!isCategoryOpen);

  const [categoryList, setCategoryList] = useState([]);
  const [invenList, setInvenList] = useState([]);

  const fetchData = useCallback(() => {
    const config = {
      withCredentials: true
    };
  
    axios.get(`${apiUrl}/api/v1/inventory`, config)
      .then((res) => {
        console.log(res);
        console.log(res.data.categorys.map((e) => e.name));
        setInvenList(res.data);
        setCategoryList(["전체", ...res.data.categorys.map((e) => e.name)]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // const memoizedCategoryList = useMemo(() => {
  //   return categoryList;
  // }, [categoryList]);
  
  // const memoizedInvenList = useMemo(() => {
  //   return invenList;
  // }, [invenList]);

  // useEffect(() => {console.log(invenList);}, [invenList]);

  const chnCategory = (e) => {
    setCategory(e);
    setIsCategoryOpen((prev) => !prev);
  }

  const [currentBox, setCurrentBox] = useState({
    "idx": 0,
    "soldOut": false
  });

  const handleModal = (idx, soldOut) => {
    console.log(idx, !soldOut);
    setIsModalOpen((prev) => !prev);
    
    setCurrentBox({
      "idx": idx,
      "soldOut": !soldOut
    });

    fetchData();
  }

  const patchData = () => {
    const config = {
      withCredentials: true
    };

    axios.patch(`${apiUrl}/api/v1/inventory`, currentBox, config)
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
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

  return (
    <div className="mainInven-wrapper">
      <div className="mainInven-title__wrapper">
        <span className="mainInven-title__span1">품절</span>
        <div className="mainInven-title__span2__wrapper" onClick={() => setIsCategoryOpen((prev) => !prev)}>
          <span style={{ 'width': '1.125rem' }}></span>
          <span className="mainInven-title__span2">{category}</span>
          {isCategoryOpen ? (<span><img src={downArrow} alt="downArrow"/></span>) : (<span><img src={upArrow} alt="upArrow"/></span>)}
        </div>
        <span className="mainInven-title__span3">상품명</span>
      </div>

      {isCategoryOpen && (
          <div className="mainInven-category__modal">
            {categoryList?.map((e, i) => (
              <>
                <span key={i} onClick={() => chnCategory(e)}>{e}</span>
                <div className="mainInven-category__line"></div>
              </>
            ))}
          </div>
        )}

      <div className="mainInven-category-content__wrapper">
        {invenList?.categorys
          ?.filter((cate) => category === "전체" || cate.name === category)
          ?.map((categoryItem) => 
            categoryItem?.foodies?.map((foodItem) => (
              <React.Fragment key={foodItem.idx}>
                <InvenBox 
                  handleModal={() => handleModal(foodItem.idx, foodItem.soldOut)} 
                  invenProps={{ 
                    category: categoryItem.name, 
                    name: foodItem.name,
                    soldOut: foodItem.soldOut
                  }}
                />
              </React.Fragment>
            )
        ))}
      </div>

      {isModalOpen && (
        <div className="inven-modal-wrapper">
          <div className="inven-modal-box">
            <div className="inven-modal-close__wrapper" onClick={() => setIsModalOpen((prev) => !prev)}>
              <img src={close} alt="close"/>
            </div>
            <div className="inven-modal-box-img__wrapper"><img src={cherry} alt="cherry" /></div>
            <div className="inven-modal-box-txt__wrapper">
              <div className="inven-modal-box-txt">품절 처리 시</div>
              <div className="inven-modal-box-txt">고객님은 해당 메뉴를 주문할 수 없습니다.</div>
            </div>
            <div className="inven-modal-box-close-btn__wrapper">
              <div className="inven-modal-box-close-btn" onClick={() => patchData()}>확인</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainInven;
