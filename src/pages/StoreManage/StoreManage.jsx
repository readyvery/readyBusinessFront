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

      <Footer />
    </div>
  );
};

export default StoreManage;
