import axios from "axios";
import { useEffect, useState } from "react";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/sale/management/amount/monthly`;

const useFetchMonthlyTotalSales = (monday) => {
  const [monthlyTotalSales, setMonthlyTotalSales] = useState(0);
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    monday: monday,
  };
  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`${apiUrl}`, body, config)
        .then((res) => {
          if (res.data.success) {
            if (res.data.totalMoney !== null)
              setMonthlyTotalSales(res.data.totalMoney);
            else {
              setMonthlyTotalSales(0);
            }
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monday]);
  return monthlyTotalSales;
};

export default useFetchMonthlyTotalSales;
