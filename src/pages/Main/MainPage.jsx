import { Link } from "react-router-dom";
import kakao from "../../assets/icons/icon_kakao_union.png";
import right from "../../assets/icons/icon_right-line.png";
import promotion from "../../assets/icons/promotion.svg";
import promotion2 from "../../assets/icons/promotion2.svg";
import promotion3 from "../../assets/icons/promotion3.png";
import MainButton from "../../components/views/Button/mainButton";
import Footer from "../../components/views/Footer/Footer";
import ResponsiveHeader from "../../components/views/Header/ResponsiveHeader";
import "./MainPage.css";

const MainPage = () => {
  const notices = [
    {
      id: 1,
      title: "2024년 4월 넷째 주(4/21~4/27) 입금 안내",
      date: "24-04-21",
    },
    {
      id: 2,
      title: "2024년 4월 셋째 주(4/14~4/20) 입금 안내",
      date: "24-04-14",
    },
    {
      id: 3,
      title: "2024년 4월 둘째 주(4/7~4/13) 입금 안내",
      date: "24-04-07",
    },
    { id: 4, title: "2024년 4월 첫째 주(4/1~4/6) 입금 안내", date: "24-04-01" },
  ];

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
            <MainButton />
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

      <div className="main__box6">
        <div className="main__notice">
          <div className="main__notice__title">
            <span>공지사항</span> <img src={right} alt=">" />
          </div>
          <ul className="main__notice__content">
            {notices.map((notice) => (
              <li key={notice.id} className="main__notice__content__item">
                <span className="main__notice__content__title">
                  {notice.title}
                </span>
                <span className="main__notice__content__date">
                  {notice.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="main__notice__consultation">
          <div className="main__notice__consultation__title">실시간 상담</div>

          <div className="main__notice__consultation__content">
            <span className="main__notice__consultation__ment">
              <div>궁금한 사항이나 도움이 필요하시면</div>
              <div>언제든지 문의해 주세요.</div>
            </span>

            <span className="main__notice__consultation__kakao">
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "var(--title, #2E2D2D)" }}>
                  레디베리 상담
                </span>
                <span style={{ color: "#838383" }}>매일 00:00 ~ 24:00</span>
              </span>
              <Link to="http://pf.kakao.com/_ZxiEjG/chat">
                <img
                  src={kakao}
                  alt="kakao"
                  className="main__notice__consultation__kakao-btn"
                />
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
