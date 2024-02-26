import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import downArrow from "../../assets/icons/icon_downArrow.svg";
import upArrow from "../../assets/icons/icon_upArrow.svg";
import InvenBox from "../../components/views/Inven/InvenBox";
import { IMAGES } from "../../constants/images";
import "./MainInven.css";


function MainInven () {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [category, setCategory] = useState("전체");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancleModalOpen, setIsCancleModalOpen] = useState(false);

  // const chnMenu = () => setIsCategoryOpen(!isCategoryOpen);

  const [categoryList, setCategoryList] = useState([]);
  const [invenList, setInvenList] = useState([]);

  const [cookies] = useCookies(["accessToken"]);

  const fetchData = useCallback(() => {
    const config = {
      withCredentials: true
    };
  
    axios.get(`${apiUrl}/api/v1/inventory`, config)
      .then((res) => {
        setInvenList(res.data);
        setCategoryList(["전체", ...res.data.categorys.map((e) => e.name)]);
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(cookies.accessToken){
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

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
    soldOut ? setIsCancleModalOpen((prev) => !prev) : setIsModalOpen((prev) => !prev);
    
    setCurrentBox({
      "idx": idx,
      "soldOut": !soldOut
    });

    fetchData();
  }

  const patchData = (e) => {
    // console.log(e.target.id);
    const config = {
      withCredentials: true
    };

    axios.patch(`${apiUrl}/api/v1/inventory`, currentBox, config)
      .then((res) => {
        console.log(res);
        e.target.id === "cancle" ? setIsCancleModalOpen(false) : setIsModalOpen(false);
        fetchData();
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
              <img src={IMAGES.check_x_gray} alt="close"/>
            </div>
            <div className="inven-modal-box-img__wrapper"><img src={IMAGES.cherry_red} alt="cherry" /></div>
            <div className="inven-modal-box-txt__wrapper">
              <div className="inven-modal-box-txt">품절 처리 시</div>
              <div className="inven-modal-box-txt">고객님은 해당 메뉴를 주문할 수 없습니다.</div>
            </div>
            <div className="inven-modal-box-close-btn__wrapper">
              <div className="inven-modal-box-close-btn" id="accept" onClick={(e) => patchData(e)}>확인</div>
            </div>
          </div>
        </div>
      )}

      {isCancleModalOpen && (
        <div className="inven-modal-wrapper">
          <div className="inven-modal-box">
            <div className="inven-modal-close__wrapper" onClick={() => setIsCancleModalOpen((prev) => !prev)}>
              <img src={IMAGES.check_x_gray} alt="close"/>
            </div>
            <div className="inven-modal-box-img__wrapper"><img src={IMAGES.cherry_red} alt="cherry" /></div>
            <div className="inven-modal-box-txt__wrapper">
              <div className="inven-modal-box-txt">품절 처리를 취소하시겠습니까?</div>
            </div>
            <div className="inven-modal-box-close-btn__wrapper">
              <div className="inven-modal-box-close-btn" id="cancle" onClick={(e) => patchData(e)}>확인</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainInven;
