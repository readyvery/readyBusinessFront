import Footer from "../../components/views/Footer/Footer";
import HeaderBack480 from "../../components/views/Header/Header480/HeaderBack480/HeaderBack480";
import HeaderMain from "../../components/views/Header/HeaderMain/HeaderMain";

const StoreManage = () => {
  return (
    <div className="store">
      <HeaderMain />
      <HeaderBack480 pageName="매장관리" />

      <Footer />
    </div>
  );
};

export default StoreManage;
