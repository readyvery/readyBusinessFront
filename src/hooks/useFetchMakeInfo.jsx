import { useQuery } from "react-query";
import commonApis from "../util/commonApis";

export const useFetchMakeInfo = () => 
    {
        const token = localStorage.getItem("accessToken");
        return useQuery('get_make_order', () => {
        return commonApis.get("/order?status=MAKE", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }, {
        // refetchInterval: 3000,
    })
}