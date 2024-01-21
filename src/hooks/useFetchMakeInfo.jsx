import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../Atom/status";
import commonApis from "../util/commonApis";

const useFetchMakeInfo = () => {
    const [makeInfo, setMakeInfo] = useState([]);
    const token = useRecoilValue(loginState);

    useEffect(() => {
        const fetchData = async () => {
            commonApis.get("/order?status=MAKE", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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