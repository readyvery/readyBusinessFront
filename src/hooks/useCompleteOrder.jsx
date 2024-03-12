import { message } from "antd";
import commonApis from "../util/commonApis";

const useCompleteOrder = () => {
    const token = localStorage.getItem("accessToken");
    const completeOrder = async (orderId) => {
        commonApis.post("/order/complete", {
            orderId: orderId,
            status: "COMPLETE",
            time: 0,
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
                    message.success("접수 완료되었습니다.");
                }
            })
            .catch((err) => {
                console.log(err);
                message.error("접수 완료 중 오류가 발생하였습니다.")
            });
    }
    return completeOrder;
}

export default useCompleteOrder;