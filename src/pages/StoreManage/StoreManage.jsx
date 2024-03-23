import Footer from "../../components/views/Footer/Footer";
import HeaderBack480 from "../../components/views/Header/Header480/HeaderBack480/HeaderBack480";
import HeaderMain from "../../components/views/Header/HeaderMain/HeaderMain";
import "./StoreManage.css";

const StoreManage = () => {
  return (
    <div className="store">
      <HeaderMain />
      <HeaderBack480 pageName="매장관리" />
      <div className="store__notice">
        심사 요청 후 심사완료까지 2~3일 소모될 수 있습니다.
      </div>

      <div className="store__management">
        <div className="store__management__title">매장정보 입력</div>
        <div className="store__management__explanation">
          상호명, 전화번호, 주소, 영업시간(휴무일),
          <br />
          매장 이미지 등을 관리합니다.
        </div>
      </div>

      <div className="store__management">
        <div className="store__management__title">메뉴 입력</div>
        <div className="store__management__explanation">
          카테고리 설정, 메뉴 설정, 옵션 설정에 대한
          <br />
          추가•수정•삭제가 가능합니다.
        </div>
      </div>

      <div className="store__management">
        <div className="store__management__title">원산지 표기</div>
        <div className="store__management__explanation">
          판매 목적으로 수입을 진행하는 경우
          <br />
          원산지 표기는 필수입니다.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoreManage;
