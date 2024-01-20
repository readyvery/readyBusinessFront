import { useEffect, useState } from "react";
import commonApis from "../util/commonApis";

const useFetchWaitInfo = () => {
    const [waitInfo, setWaitInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            commonApis.get("/order?status=ORDER")
                .then((res) => {
                    console.log(res);
                    setWaitInfo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.status === 404 && err.message === "Not found order.") {
                        setWaitInfo([]);
                    };
                });
        }
        fetchData();
    }, []);
    return waitInfo;
}

export default useFetchWaitInfo;