import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../Atom/status";
import commonApis from "../util/commonApis";

const useFetchCompletetInfo = () => {
    const [completeInfo, setCompleteInfo] = useState([]);
    const token = useRecoilValue(loginState);

    useEffect(() => {
        const fetchData = async () => {
            commonApis.get("/order?status=COMPLETE", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            })
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return completeInfo;
}

export default useFetchCompletetInfo;
