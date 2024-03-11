import { useQuery } from "react-query";
import commonApis from "../util/commonApis";

export const useFetchWaitInfo = () => 
    {
        const token = localStorage.getItem("accessToken");
        return useQuery('get_wait_order', () => {
        return commonApis.get("/order?status=ORDER", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }, {
        // refetchInterval: 3000,
        refetchOnWindowFocus: true
    })
}