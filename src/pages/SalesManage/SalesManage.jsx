import Footer from "../../components/views/Footer/Footer";
import HeaderBack480 from "../../components/views/Header/Header480/HeaderBack480/HeaderBack480";
import HeaderMain from "../../components/views/Header/HeaderMain/HeaderMain";
import "./SalesManage.css";
import { IMAGES } from "../../constants/images";
const SalesManage = () => {
  return (
    <div className="sales">
      <HeaderMain />
      <HeaderBack480 pageName={"매출관리"} />

      <div className="sales__box1">
        <div className="sales__amount">
          <div>
            <div className="sales__amount__title">이번달</div>
            <div className="sales__amount__price">
              <span>154,876,778</span> 원
            </div>
          </div>

          <div>
            <div className="sales__amount__title">이번주</div>
            <div className="sales__amount__price">
              <span>154,876,778</span> 원
            </div>
          </div>
        </div>
        <div className="sales__standard">(기준 12월13일 11:30)</div>
      </div>

      <div className="sales__box2">
        <div className="sales__graph">
          <div className="sales__graph__title">주간매출</div>
          <div className="sales__graph__date">
            <img src={IMAGES.btn_sales_prev} alt="<" className="sales__graph__date__prev" />
            2024-01-01 ~ 2024-01-07
            <img src={IMAGES.btn_sales_next} alt=">" className="sales__graph__date__next" />
          </div>
        </div>
        <div className="sales__notice">
          매출 발생 후 최대 5영업일 이내에 입금 예정 ( 문의 : 오남택
          010-9295-5340 )
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SalesManage;
