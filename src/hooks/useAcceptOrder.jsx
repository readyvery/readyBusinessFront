import { message } from "antd";
import commonApis from "../util/commonApis";
import usePrintHandler from "./usePrintHandler";

const useAcceptOrder = () => {
    const token = localStorage.getItem("accessToken");
    const onClickPrintHandler = usePrintHandler();

    const acceptOrder = async (orderId, time) => {
        commonApis.post("/order/complete", {
            orderId: orderId,
            status: "MAKE",
            time: time,
            rejectReason: "",
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res);
                if(res.status === 200 && res.data.success === true){
                    message.success("주문 접수되었습니다.");
                    onClickPrintHandler(); // 영수증 출력
                }
            })
            .catch((err) => {
                console.log(err);
                message.error("주문 접수 중 오류가 발생하였습니다.")
            });
    }
    return acceptOrder;
}

export default useAcceptOrder;