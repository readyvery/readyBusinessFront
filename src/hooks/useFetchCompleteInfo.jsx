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
    });

    const refreshData = () => {
        refetch();
    };

    const orders = data?.data?.orders ?? [];

    return { orders, isLoading, error, refreshData };
};
