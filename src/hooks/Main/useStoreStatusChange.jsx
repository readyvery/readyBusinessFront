import { message } from "antd";
import { useSetRecoilState } from "recoil";
import { storeContextState } from "../../Atom/status";
import commonApis from "../../util/commonApis";

const apiUrl = `/store/sales`;

const useStoreStatusChange = () => {
  const token = localStorage.getItem("accessToken");
  const setStoreStatus = useSetRecoilState(storeContextState);

  const storeStatusChange = async (status) => {
    console.log('status: ', status);
    const body ={
      status: status
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await commonApis.post(
        apiUrl, body, config
      );
      if(response.status === 200){
        message.success("영업 상태 변경 완료되었습니다.");
        setStoreStatus(response.data.status);
      } else {
        message.error("영업 상태 변경 실패하였습니다.");
      }
    } catch (error) {
      console.log(error);
      message.error("영업 상태 변경 중 오류가 발생하였습니다.");
    }
  }
  return storeStatusChange;
};

export default useStoreStatusChange;
