import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import 'moment/locale/ko';
import moment from 'moment/moment';
import React, { useEffect, useState } from "react";
import ApexChart from '../../components/views/Chart/ApexChart';
import "./MainSales.css";

const MainSales = () => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  
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

    fetchSales(currentWeekStart.format("YYYY-MM-DD"));
  };

  const handleNextWeek = () => {
    const currentWeekStart = moment(currentDate.monday).startOf('isoWeek').add(1, 'weeks');
    const currentWeekEnd = moment(currentWeekStart).endOf('isoWeek');

    setCurrentDate({
      monday: currentWeekStart,
      sunday: currentWeekEnd
    });

    fetchSales(currentWeekStart.format("YYYY-MM-DD"));
  };

  const [totalSale, setTotalSale] = useState(0);
  const [chartData, setChartData] = useState([]);


  const fetchSales = (monday) => {
    const config = {
      withCredentials: true
    };

    const body = {
      "monday": monday
    };

    axios.post(`${apiUrl}/api/v1/sale/management`, body, config)
      .then((res) => {
        console.log(res);
        if(res.data.success){
          // setChartData(res.data.saleManagementList.map(item => {
          //   console.log((item.sale / 1000).toFixed(1));
          //   return {
          //   "day": item.day.slice(0, 3),
          //   "매출": ((item.sale / 1000).toFixed(1)).toString()
          // }}));
          setChartData(res.data.saleManagementList);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    const config = {
      withCredentials: true
    };
    
    axios.get(`${apiUrl}/api/v1/sale/total`, config)
      .then((res) => {
        console.log(res);
        if(res.data.success){
          setTotalSale(res.data.totalSale);
        }
      })
      .catch((err) => console.log(err));

    fetchSales(currentDate.monday.format("YYYY-MM-DD"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="sales-main__wrapper">
      <div className='sales-top__wrapper'>
        <div className="sales-total-revenue">레디베리를 통해 누적 <span style={{ 'color': '#d82356', "fontSize": "2.8125rem" }}>{totalSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>의 매출을 올렸습니다.</div>
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
          {/* <Chart data={chartData} /> */}
          <ApexChart data={chartData}/>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MainSales);
