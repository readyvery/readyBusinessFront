import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../Atom/status";
import commonApis from "../util/commonApis";

const useFetchMonthlySale = () => {
    const [currentAmount, setCurrentAmount] = useState();
    const token = useRecoilValue(loginState);

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }

    const currentDate = getCurrentDate();

    useEffect(() => {
        const fetchData = async () => {
            commonApis.get("/sale/management/amount/weekly", {
                headers: {
                    monday: currentDate,
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