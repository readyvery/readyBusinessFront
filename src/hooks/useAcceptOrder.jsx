import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import commonApis from "../util/commonApis";
import usePrintHandler from "./usePrintHandler";

const useAcceptOrder = () => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("accessToken");

    const onClickPrintHandler = usePrintHandler();

    const { mutate: acceptOrder, isLoading, isError, error } = useMutation(
        ( e ) => commonApis.post("/order/complete", {
            orderId: e.split("@")[0],
            status: "MAKE",
            time: e.split("@")[1],
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
                    message.success("주문 접수되었습니다.");
                    queryClient.invalidateQueries({queryKey: ["get-wait"]}); // 쿼리 무효화
                    queryClient.invalidateQueries({queryKey: ["get-make"]}); // 쿼리 무효화
                    onClickPrintHandler();
                } else {
                    message.destroy();
                    message.error("주문 접수 실패. 다시 시도해주세요.");
                    queryClient.invalidateQueries({queryKey: ["get-wait"]}); // 쿼리 무효화
                    queryClient.invalidateQueries({queryKey: ["get-make"]}); // 쿼리 무효화
                }
            },
            onError: (err) => {
                console.error(err);
                message.destroy();
                message.error("주문 접수 중 오류가 발생하였습니다.");
            },
        }
    );

    return { acceptOrder, isLoading, isError, error };
}

export default useAcceptOrder;