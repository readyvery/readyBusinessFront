import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import commonApis from "../util/commonApis";

const useCancelOrder = () => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("accessToken");
    
    const { mutate: cancelOrder, isLoading, isError, error } = useMutation(
        ( e ) => commonApis.post("/order/cancel", {
            orderId: e.split("@")[0],
            status: "CANCEL",
            time: 0,
            rejectReason: e.split("@")[1],
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        {
            onSuccess: (data) => {
                if (data.status === 200 && data.data.success === true) {
                    message.destroy();
                    message.success("주문 취소되었습니다.");
                    queryClient.invalidateQueries({queryKey: ["get-integration"]}); // 신규 주문 건 쿼리 무효화
                } else {
                    message.destroy();
                    message.error("주문 취소 실패. 다시 시도해주세요.");
                    queryClient.invalidateQueries({queryKey: ["get-integration"]}); // 신규 주문 건 쿼리 무효화
                }
            },
            onError: (err) => {
                console.error(err);
                message.destroy();
                message.error("주문 취소 중 오류가 발생하였습니다.");
            },
        }
    );

    return { cancelOrder, isLoading, isError, error };
}

export default useCancelOrder;