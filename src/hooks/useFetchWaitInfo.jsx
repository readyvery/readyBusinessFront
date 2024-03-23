import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../Atom/status";
import commonApis from "../util/commonApis";

const useFetchWaitInfo = () => {
    const [waitInfo, setWaitInfo] = useState([]);
    const token = useRecoilValue(loginState);

    useEffect(() => {
        const fetchData = async () => {
            commonApis.get("/order?status=ORDER", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            })
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return waitInfo;
}

export default useFetchWaitInfo;