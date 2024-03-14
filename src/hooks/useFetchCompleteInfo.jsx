import { useQuery } from "react-query";
import commonApis from "../util/commonApis";

export const useFetchCompleteInfo = () => {
    const token = localStorage.getItem("accessToken");
    const { data, error, isLoading, refetch } = useQuery(["get-complete"], () => {
    return commonApis.get("/order?status=COMPLETE", {
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