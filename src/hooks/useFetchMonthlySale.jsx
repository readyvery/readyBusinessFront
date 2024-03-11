import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../Atom/status";

const useFetchMonthlySale = () => {
    const [currentAmount, setCurrentAmount] = useState('');
    const token = useRecoilValue(loginState);
    const apiUrl = process.env.REACT_APP_API_ROOT;

    function getCurrentDate() {
        const today = new Date();
        const year = String(today.getFullYear());
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }

    const currentDate = String(getCurrentDate());

    useEffect(() => {
        const fetchData = () => {
            axios.post(`${apiUrl}/api/v1/sale/management/amount/monthly`, { monday: currentDate } , { 
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            })
                .then((res) => {
                    console.log(res);
                    setCurrentAmount(res.data.totalMoney);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.status === 404 && err.message === "Not found order.") {
                        setCurrentAmount(0);
                    };
                });
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return currentAmount;
}

export default useFetchMonthlySale;