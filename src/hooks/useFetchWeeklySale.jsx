import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../Atom/status";

const useFetchWeeklySale = () => {
    const apiUrl = process.env.REACT_APP_API_ROOT;
    const [currentAmount, setCurrentAmount] = useState();
    const token = useRecoilValue(loginState);

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }

    const currentDate = getCurrentDate().toString();
    console.log("아아아아" + currentDate)

    useEffect(() => {
        try {
            const response = axios.post(
              `${apiUrl}/api/v1/sale/management/amount/weekly`,
              {
                monday: currentDate,
                Authorization: `Bearer ${token.accessToken}`
              }
            );
            console.log(response);
      
            if (response.data.success) {
              setCurrentAmount(response.data.totalMoney);
            } else {
              setCurrentAmount(0);
            }
          } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return currentAmount;
}

export default useFetchWeeklySale;