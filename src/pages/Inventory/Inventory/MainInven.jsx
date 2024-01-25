import React, { useCallback, useEffect, useState } from "react";
import close from "../../../assets/icons/icon_closeModal.svg";
import downArrow from "../../../assets/icons/icon_downArrow.svg";
import upArrow from "../../../assets/icons/icon_upArrow.svg";
import cherry from "../../../assets/icons/small_cherry.svg";
import "./MainInven.css";
import InvenList from "../../../components/views/Inven/InvenList";
// 통신부
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../Atom/status";

function MainInven() {
  const [category, setCategory] = useState("전체");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); //품절모달창에 대한 내용
  const [isSoldOutModalOpen, setIsSoldOutModalOpen] = useState(false); //품절처리모달인지
  const [isCancleModalOpen, setIsCancleModalOpen] = useState(false);//처리 취소모달인지

  // 통신부
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const accessTokenInfo = useRecoilValue(loginState);
  const { accessToken } = accessTokenInfo;
  const [categoryList, setCategoryList] = useState([]);
  const [invenList, setInvenList] = useState([]);
  const [currentBox, setCurrentBox] = useState({
    "idx": 0,
    "soldOut": false
  });

  // api를 통해 데이터 갱신
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
    if (accessToken) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);
    // 모달 확인시 데이터 업데이트 (상태: 품절 처리)
    const patchData = (e) => {
      const config = {
        withCredentials: true
      };
  
      axios.patch(`${apiUrl}/api/v1/inventory`, currentBox, config)
        .then((res) => {
          console.log(res);
          e.target.id === "cancle" ? setIsCancleModalOpen(false) : setIsSoldOutModalOpen(false);
          setIsModalOpen(false);
          fetchData();
        })
        .catch((err) => console.log(err));
    };

  // 카테고리 변경
  const chnCategory = (e) => {
    setCategory(e);
    setIsCategoryOpen((prev) => !prev);
  }
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
      "idx": idx,
      "soldOut": !soldOut
    });

    fetchData();
    // console.log(isModalOpen, isSoldOutModalOpen, isCancleModalOpen);
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
  const SoldOutModal = ({titletxt, contenttxt,requestid}) => {
    return(
      <div className="inven-modal-wrapper">
        <div className="inven-modal-box">
          <div className="inven-modal-close__wrapper" onClick={() => {handleIsCloseModal()}}>
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
          <div className="inven-modal-box-close-btn" id={requestid} onClick={(e) => patchData(e)}>
            확인
          </div>
        </div>
      </div>
    </div>
    )
  }
  return (
    <>
      <div className="mainInven-wrapper">
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
        <InvenList category={category} invenList={invenList} handleModal={handleModal} />
      </div>

      { isSoldOutModalOpen &&
        (!isCancleModalOpen) &&
        isModalOpen && 
        <SoldOutModal titletxt="품절 처리 시 고객님은" contenttxt="해당 메뉴를 주문할 수 없습니다." requestid="accept"/> }

      {(!isSoldOutModalOpen) &&
        isCancleModalOpen &&
        isModalOpen && 
        <SoldOutModal titletxt=" " contenttxt="품절 처리를 취소하시겠습니까?" requestid="cancle"/> }
    </>
  );
}

export default MainInven;