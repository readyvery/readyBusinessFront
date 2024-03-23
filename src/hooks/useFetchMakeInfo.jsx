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
                    Authorization: `Bearer ${token.accessToken}`
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return makeInfo;
}

export default useFetchMakeInfo;