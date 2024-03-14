import { useQuery } from "react-query";
import commonApis from "../util/commonApis";

export const useFetchMakeInfo = () => {
    const token = localStorage.getItem("accessToken");
    const { data, error, isLoading, refetch } = useQuery(["get-make"], () => {
    return commonApis.get("/order?status=MAKE", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    }, {
        // refetchInterval: 3000,
    })

    const refreshData = () => {
        refetch();
    };

    return { data, isLoading, error, refreshData };
}