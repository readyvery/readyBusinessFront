import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { storeIdxState } from "../Atom/status";
import commonApis from "../util/commonApis";

export const useFetchIntegrationInfo = () => {
    const token = localStorage.getItem("accessToken");
    const [rstoreIdx, setStoreIdx] = useRecoilState(storeIdxState); // storeIdx
    
    const { data, error, isLoading, refetch } = useQuery(["get-integration"], () => {
    return commonApis.get("/order?status=INTEGRATION", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    }, {
        refetchInterval: 5000, // 5초
    })

    const refreshData = () => {
        refetch();
    };

    // storeIdx: 가게 인덱스, orders: 신규, integrationMakeOrders: 진행
    const {storeIdx, orders, integrationMakeOrders} = data?.data ?? [];
    storeIdx && rstoreIdx !== storeIdx && setStoreIdx(storeIdx); // recoil에 storeIdx 갱신

    return { orders, integrationMakeOrders, isLoading, error, refreshData};
}