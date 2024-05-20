import { useQuery } from "react-query";
import commonApis from "../util/commonApis";

export const useFetchWaitInfo = () => {
    const token = localStorage.getItem("accessToken");
    const { data, error, isLoading, refetch } = useQuery(["get-wait"], () => {
    return commonApis.get("/order?status=ORDER", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    }, {
        refetchInterval: 5000, // 5초
        refetchOnWindowFocus: true
    })

    const refreshData = () => {
        refetch();
    };

    return {data, isLoading, error, refreshData};
}