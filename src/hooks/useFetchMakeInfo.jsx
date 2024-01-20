import { useEffect, useState } from "react";
import commonApis from "../util/commonApis";

const useFetchMakeInfo = () => {
    const [makeInfo, setMakeInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            commonApis.get("/order?status=MAKE")
                .then((res) => {
                    console.log(res);
                    setMakeInfo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.status === 404 && err.message === "Not found order.") {
                        setMakeInfo([]);
                    };
                });
        }
        fetchData();
    }, []);
    return makeInfo;
}

export default useFetchMakeInfo;