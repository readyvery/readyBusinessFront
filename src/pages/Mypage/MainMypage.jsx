import React, { useEffect, useState } from "react";
import Modal from "../../components/views/Modal/Modal";
import useMypageLogout from "../../hooks/Mypage/useMypageLogout";
import useMypageStoreInformation from "../../hooks/Mypage/useMypageStoreInformation";
import "./MainMypage.css";
const MainMypage = React.memo(() => {
  const { getCafeInfo } = useMypageStoreInformation();
  const [openTimeArr, setOpenTimeArr] = useState([]);
  const { isTokenLogout } = useMypageLogout();
  const [cafeInfo, setCafeInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // 로그아웃 모달 표시 여부
  // 가게 정보 받아옴
  useEffect(() => {
    setCafeInfo(getCafeInfo);
    // "월~금 8:40 - 23:00 \n토 11:00 - 22:00 \n일 정기휴무\n기말고사(12/4~12/15) 연장운영 8:30 ~ 24:00"로 오는 데이터를 \n단위로 갱신
    setOpenTimeArr(getCafeInfo?.openTime?.split("\n"))
  },[getCafeInfo])


  // 로그아웃 모달 관련
  // 로그아웃 모달 열기
  const handleLogoutOpenModal = () => {
    setIsModalOpen(true);
  }
  // 로그아웃
  const handleLogout = () => {
    isTokenLogout();
  };
  // 로그아웃 모달 닫기
  const handleCancle = () => {
    setIsModalOpen(false); // 모달 닫기 (로그인 상태 변경 없음)
  };

  // 위는 서버 연결
  const MypageMainContentBox = ({ label, children }) => {
    return (
      <div className="mypage-main">
        <label className="mypage-main-content-box">{label}</label>
        <div className="mypage-main-content-box-children">{children}</div>
      </div>
    );
  };
  const MypageMainContentBoxInput = ({ id, type, value, day }) => {
    // 가게 번호 phone값 010 - 0000 - 0000
    if (id === "storeNumber" && value) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1 - $2 - $3");
    }
    return (
      <div id={id} type={type} className="mypage-main-content-box-text">
        {day ? (
          <>
            <span>({day})</span>
            {value}
          </>
        ) : (
          value
        )}
      </div>
    );
  };

  return (
    <div className="mypage-main-wrapper">
      <MypageMainContentBox label={"상호명"}>
        <MypageMainContentBoxInput
          id="storeName"
          type={"text"}
          value={cafeInfo?.storeName}
        />
      </MypageMainContentBox>
      <MypageMainContentBox label={"매장 전화번호"}>
        <MypageMainContentBoxInput
          id="storeNumber"
          type={"text"}
          value={cafeInfo?.phone}
        />
      </MypageMainContentBox>
      <MypageMainContentBox label={"매장 주소"}>
        {/* 매장 주소 구분자 나오면 업데이트 예정 */}
        <MypageMainContentBoxInput
          id="storePostAddressNum"
          type={"text"}
          value={cafeInfo?.address}
        />
        <MypageMainContentBoxInput
          id="storePostAddressTxt"
          type={"text"}
          value={cafeInfo?.address}
        />
        <MypageMainContentBoxInput
          id="storePostAddressTxtDetail"
          type={"text"}
          value={cafeInfo?.address}
        />
      </MypageMainContentBox>
      <MypageMainContentBox label={"영업시간 및 휴무일"}>
        <MypageMainContentBoxInput
          day="평일"
          id="storeOpenTime"
          type={"text"}
          value={openTimeArr?.[0]}
        />
        <MypageMainContentBoxInput
          day="토요일"
          id="storeOpenTime"
          type={"text"}
          value={openTimeArr?.[1]}
        />
        {console.log(openTimeArr)}
        <MypageMainContentBoxInput
          day="일요일"
          id="storeOpenTime"
          type={"text"}
          value={openTimeArr?.[2]}
        />
        <MypageMainContentBoxInput
          day="휴무일"
          id="storeOpenTime"
          type={"text"}
          value={openTimeArr?.[3]}
        />
      </MypageMainContentBox>
      <MypageMainContentBox label={"계좌번호"}>
        <MypageMainContentBoxInput
          id="storeBank"
          type={"text"}
          value={cafeInfo?.account?.[0]}
        />
        <MypageMainContentBoxInput
          id="storeBankAccount"
          type={"number"}
          value={cafeInfo?.account?.[1]}
        />
      </MypageMainContentBox>
      <div className="mypage-logout__wrapper" onClick={handleLogoutOpenModal}>
        <span>로그아웃</span>
      </div>
      {isModalOpen && (
        <Modal
          handleCancle={handleCancle}
          handleCheck={handleLogout}
          title={"로그아웃하시겠습니까?"}
        />)}
    </div>
  );
});

export default MainMypage;
