import moment from "moment/moment";
import { Link } from "react-router-dom";
import right from "../../assets/icons/icon_right-line.png";
import MainButton from "../../components/views/Button/mainButton";
import Footer from "../../components/views/Footer/Footer";
import ResponsiveHeader from "../../components/views/Header/ResponsiveHeader";
import { IMAGES } from "../../constants/images";
import useFatchWeekAndMonthOrderCount from "../../hooks/Sales/useFatchWeekAndMonthOrderCount";
import useFetchWeekTotalSales from "../../hooks/Sales/useFetchWeekTotalSales";
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
  // 현 날짜
  const currentDate = {
    monday: moment(moment()).startOf("isoWeek"),
    sunday: moment(moment()).endOf("isoWeek"),
  };
  const weekStart = currentDate.monday.format("YYYY-MM-DD");
  const weekTotalSales = useFetchWeekTotalSales(weekStart);
  const weekAndMonthOrderCount = useFatchWeekAndMonthOrderCount(weekStart);
  //객체 구성{totalWeekOrder, totalMonthOrder}
  return (
    <div className="main">
      <ResponsiveHeader />

      <div className="main__box1">
        <picture>
          <source media="(min-width: 1024px)" srcSet={IMAGES.promotion_3} />
          <source media="(min-width: 480px)" srcSet={IMAGES.promotion_2} />
          <source media="(max-width: 480px)" srcSet={IMAGES.promotion_1} />
          <img
            src={IMAGES.promotion_3}
            alt="promotion"
            className="main__promotion"
          />
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
                <div className="main__sales__amount__content">
                  {weekTotalSales
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </div>
                <div className="main__sales__amount__predicate">
                  매출을 기록했습니다
                </div>
              </div>
            </span>

            <span className="main__sales__case">
              <div className="main__sales__case__this-week">
                <span className="main__sales__case__title">이번주</span>
                <span className="main__sales__case__amount">
                  {weekAndMonthOrderCount.totalWeekOrder}건
                </span>
              </div>
              <div className="main__sales__case__this-month">
                <span className="main__sales__case__title">이번달</span>
                <span className="main__sales__case__amount">
                  {weekAndMonthOrderCount.totalMonthOrder}건
                </span>
              </div>
            </span>
          </div>
          <div className="main__sales__standard">
            {" "}
            (기준 {moment().format("M")}월 {moment().format("D")}일{" "}
            {moment().format("HH")}:{moment().format("mm")})
          </div>
        </div>

        <div className="main__guide">
          <div className="main__guide__title">
            <span>레디베리 가이드</span> <img src={right} alt=">" />
          </div>
          <div className="main__guide__content">
            <Link
              to={
                "https://readyberry.notion.site/8cab670acd234eebb9d35d4540ef49c9"
              }
              className="main__guide1"
            >
              입점가이드
            </Link>
            <Link
              to={
                "https://readyberry.notion.site/473a61b674204f5b913ff8dc41929914"
              }
              className="main__guide2"
            >
              주문접수 이용방법
            </Link>
            <Link
              to={
                "https://readyberry.notion.site/86960eb623ee4abd8af7219ad6db9e37"
              }
              className="main__guide3"
            >
              재고관리 이용방법
            </Link>
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
                <div className="main__notice__consultation__kakao-btn">
                  <img src={IMAGES.kakao_open_chat} alt="kakao" />
                </div>
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
