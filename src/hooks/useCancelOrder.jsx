import { message } from "antd";
import { useRecoilValue } from "recoil";
import { loginState } from "../Atom/status";
import commonApis from "../util/commonApis";

const useCancelOrder = () => {
    const token = useRecoilValue(loginState);
    const cancelOrder = async (orderId, rejectReason) => {
        console.log(orderId, rejectReason);
        commonApis.post("/order/cancel", {
            orderId: orderId,
            status: "CANCEL",
            time: 0,
            rejectReason: rejectReason,
        },
        {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        })
            .then((res) => {
                console.log(res);
                if(res.status === 200 && res.data.success === true){
                    message.success("주문 취소되었습니다.");
                }
            })
            .catch((err) => {
                console.log(err);
                message.error("주문 취소 중 오류가 발생하였습니다.")
            });
    }
    return cancelOrder;
}

export default useCancelOrder;