import moment from "moment/moment";
import { useState } from "react";
import WeekSalesCharts from "../../components/Sales/WeekSalesCharts";
import Footer from "../../components/views/Footer/Footer";
import HeaderBack480 from "../../components/views/Header/Header480/HeaderBack480/HeaderBack480";
import HeaderMain from "../../components/views/Header/HeaderMain/HeaderMain";
import { IMAGES } from "../../constants/images";
import useFatchWeekSalesCharts from "../../hooks/Sales/useFatchWeekSalesCharts";
import useFetchMonthlyTotalSales from "../../hooks/Sales/useFetchMonthlyTotalSales";
import useFetchWeekTotalSales from "../../hooks/Sales/useFetchWeekTotalSales";
import "./SalesManage.css";
const SalesManage = () => {
  const [currentDate, setCurrentDate] = useState({
    monday: moment(moment()).startOf("isoWeek"),
    sunday: moment(moment()).endOf("isoWeek"),
  });
  const [weekStart, setWeekStart] = useState(
    currentDate.monday.format("YYYY-MM-DD")
  );
  const weekTotalSales = useFetchWeekTotalSales(weekStart);
  const weekSalesCharts =  useFatchWeekSalesCharts(weekStart);
  const monthlyTotalSales = useFetchMonthlyTotalSales(weekStart);
  const handlePrevWeek = () => {
    const currentWeekStart = moment(currentDate.monday)
      .startOf("isoWeek")
      .add(-1, "weeks");
    const currentWeekEnd = moment(currentWeekStart).endOf("isoWeek");

    setCurrentDate({
      monday: currentWeekStart,
      sunday: currentWeekEnd,
    });

    setWeekStart(currentWeekStart.format("YYYY-MM-DD"));
  };
  const handleNextWeek = () => {
    const currentWeekStart = moment(currentDate.monday)
      .startOf("isoWeek")
      .add(1, "weeks");
    const currentWeekEnd = moment(currentWeekStart).endOf("isoWeek");

    setCurrentDate({
      monday: currentWeekStart,
      sunday: currentWeekEnd,
    });

    setWeekStart(currentWeekStart.format("YYYY-MM-DD"));
  };
  return (
    <div className="sales">
      <HeaderMain />
      <HeaderBack480 pageName={"매출관리"} />

      <div className="sales__box1">
        <div className="sales__amount">
          <div>
            <div className="sales__amount__title">이번달</div>
            <div className="sales__amount__price">
              <span>{monthlyTotalSales} 원</span>
            </div>
          </div>

          <div>
            <div className="sales__amount__title">이번주</div>
            <div className="sales__amount__price">
              <span>{weekTotalSales} 원</span>
            </div>
          </div>
        </div>
        <div className="sales__standard">
          (기준 {moment().format("M")}월 {moment().format("D")}일{" "}
          {moment().format("HH")}:{moment().format("mm")})
        </div>
      </div>

      <div className="sales__box2">
        <div className="sales__graph">
          <div className="sales__graph__title">주간매출</div>
          <div className="sales__graph__date">
            <img
              src={IMAGES.btn_sales_prev}
              alt="<"
              className="sales__graph__date__prev"
              onClick={handlePrevWeek}
            />
            {currentDate.monday.format("YYYY-MM-DD")} ~{" "}
            {currentDate.sunday.format("YYYY-MM-DD")}
            <img
              src={IMAGES.btn_sales_next}
              alt=">"
              className="sales__graph__date__next"
              onClick={handleNextWeek}
            />
          </div>
          <WeekSalesCharts data={weekSalesCharts}/>
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
