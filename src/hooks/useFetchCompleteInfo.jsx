import { useEffect, useState } from "react";
import commonApis from "../util/commonApis";

const useFetchCompletetInfo = () => {
    const [completeInfo, setCompleteInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            commonApis.get("/order?status=COMPLETE")
                .then((res) => {
                    console.log(res);
                    setCompleteInfo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.status === 404 && err.message === "Not found order.") {
                        setCompleteInfo([]);
                    };
                });
        }
        fetchData();
    }, []);
    return completeInfo;
}

export default useFetchCompletetInfo;