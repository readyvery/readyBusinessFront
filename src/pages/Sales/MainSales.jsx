import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'moment/locale/ko';
import moment from 'moment/moment';
import React, { useState } from "react";
import Chart from '../../components/views/Chart/Chart';
import "./MainSales.css";

const MainSales = () => {
  const chartData = 
  [
    {
      "day": "Mon",
      "매출": 160,
    },
    {
      "day": "Tue",
      "매출": 84,
    },
    {
      "day": "Wed",
      "매출": 1,
    },
    {
      "day": "Thu",
      "매출": 159,
    },
    {
      "day": "Fri",
      "매출": 168,
    },
    {
      "day": "Sat",
      "매출": 118,
    },
    {
      "day": "Sun",
      "매출": 170,
    }
  ];

  const [currentDate, setCurrentDate] = useState({
    monday: moment(moment()).startOf('isoWeek'),
    sunday: moment(moment()).endOf('isoWeek')
  });
  
  const handlePrevWeek = () => {
    const currentWeekStart = moment(currentDate.monday).startOf('isoWeek').add(-1, 'weeks');
    const currentWeekEnd = moment(currentWeekStart).endOf('isoWeek');

    setCurrentDate({
      monday: currentWeekStart,
      sunday: currentWeekEnd
    });
  };

  const handleNextWeek = () => {
    const currentWeekStart = moment(currentDate.monday).startOf('isoWeek').add(1, 'weeks');
    const currentWeekEnd = moment(currentWeekStart).endOf('isoWeek');

    setCurrentDate({
      monday: currentWeekStart,
      sunday: currentWeekEnd
    });
  };

  return (
    <section className="sales-main__wrapper">
      <div className='sales-top__wrapper'>
        <div className="sales-total-revenue">레디베리를 통해 누적 <span style={{ 'color': '#d82356', "fontSize": "2.8125rem" }}>1,170,500원</span>의 매출을 올렸습니다.</div>
        <div className='sales-total-txt__wrapper'>
          <span className='sales-total-txt'>매출 발생 후 최대 5영업일 이내에 중개 수수료 차감 후 입금 예정 ( 문의 : 오남택 010-9295-5340 )</span>
          <span className='sales-total-date'>(기준 {moment().format("M")}월 {moment().format("D")}일 {moment().format("HH")}:{moment().format("mm")})</span>
        </div>
      </div>

      <div className="sales-revenue__wrapper">
        <div className="sales-revenue-title">주간매출</div>
        <div className="sales-revenue-week__wrapper">
          <span className='sales-revenue-img__wrapper' onClick={handlePrevWeek}><ArrowBackIosNewIcon /></span>
          <span>
            <div className="sales-revenue-week__title">{currentDate.monday.format("YYYY-MM-DD")} ~ {currentDate.sunday.format("YYYY-MM-DD")}</div>
            {/* <div className="sales-revenue-week__date">{currentDate.monday.format("YYYY-MM-DD")} ~ {currentDate.sunday.format("YYYY-MM-DD")}</div> */}
          </span>
          <span className='sales-revenue-img__wrapper' onClick={handleNextWeek}><ArrowForwardIosIcon/></span>
        </div>
        <div className="sales-chart__wrapper">
          <Chart data={chartData} />
        </div>
      </div>
    </section>
  );
};

export default MainSales;
