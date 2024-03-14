import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import commonApis from "../util/commonApis";

const useCompleteOrder = () => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("accessToken");

    const { mutate: completeOrder, isLoading, isError, error } = useMutation(
        ( orderId ) => commonApis.post("/order/complete", {
            orderId: orderId,
            status: "COMPLETE",
            time: 0,
            rejectReason: "",
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        {
            onSuccess: (data) => {
                if (data.status === 200 && data.data.success === true) {
                    message.destroy();
                    message.success("완료 처리되었습니다.");
                    queryClient.invalidateQueries({queryKey: ["get-make"]});
                    queryClient.invalidateQueries({queryKey: ["get-complete"]});
                } else {
                    message.destroy();
                    message.error("완료 처리 실패. 다시 시도해주세요.");
                    queryClient.invalidateQueries({queryKey: ["get-make"]});
                    queryClient.invalidateQueries({queryKey: ["get-complete"]});
                }
            },
            onError: (err) => {
                console.error(err);
                message.destroy();
                message.error("완료 처리 중 오류가 발생하였습니다.");
            },
        }
    );

    return { completeOrder, isLoading, isError, error };
}

export default useCompleteOrder;