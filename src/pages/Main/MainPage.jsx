import ResponsiveHeader from "../../components/views/Header/ResponsiveHeader";
import promotion from "../../assets/icons/promotion.svg";
import promotion2 from "../../assets/icons/promotion2.svg";
import promotion3 from "../../assets/icons/promotion3.png";
import right from "../../assets/icons/icon_right-line.png";
import "./MainPage.css";
import Footer from "../../components/views/Footer/Footer";

function MainPage() {
  return (
    <div className="main">
      <ResponsiveHeader />

      <div className="main__box1">
        <picture>
          <source media="(min-width: 1024px)" srcSet={promotion3} />
          <source media="(min-width: 480px)" srcSet={promotion2} />
          <source media="(max-width: 480px)" srcSet={promotion} />
          <img src={promotion3} alt="promotion" className="main__promotion" />
        </picture>

        <span className="main__president">
          <span className="main__box2">
            <span className="main__president__ready">오늘도 준비된</span>
            <span className="main__president__name">오르다커피 사장님</span>
          </span>

          <span className="main__box3">
            <span className="main__order-management-btn">
              주문관리 바로가기
            </span>
            <span className="main__order-management__notice">
              매장관리 입력 후 이용 가능합니다.
            </span>
          </span>
        </span>
      </div>

      <div className="main__box4">
        <div className="main__sales">
          <div className="main__box5">
            <span className="main__sales__amount">
              <div>
                <div className="main__sales__amount__title">
                  레디베리를 통해 이번주
                </div>
                <div className="main__sales__amount__content">0원</div>
                <div className="main__sales__amount__predicate">
                  매출을 기록했습니다
                </div>
              </div>
            </span>

            <span className="main__sales__case">
              <div className="main__sales__case__this-week">
                <span className="main__sales__case__title">이번주</span>
                <span className="main__sales__case__this-week-amount">0원</span>
              </div>
              <div className="main__sales__case__this-month">
                <span className="main__sales__case__title">이번달</span>
                <span className="main__sales__case__this-month-amount">
                  0원
                </span>
              </div>
            </span>
          </div>
          <div className="main__sales__standard">(기준 12월 13일 11:30)</div>
        </div>

        <div className="main__guide">
          <div className="main__guide__title">
            <span>레디베리 가이드</span> <img src={right} alt=">" />
          </div>
          <div className="main__guide__content">
            <span className="main__guide1">주문접수 이용방법</span>
            <span className="main__guide2">메뉴수정 이용방법</span>
            <span className="main__guide3">재고관리 이용방법</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
