import { message } from "antd";
import axios from "axios";

// 인증번호 발송 로직
const useSendVerifySms = () => {
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";
  const apiUrl = `${apiRoot}/${apiVer}/sms/send`;

  const handleSendVerifySms = async ({ userPhonenumber, onPostSuccess }) => {
    try {
      const response = await axios.post(`${apiUrl}`, {
        phoneNumber: userPhonenumber,
      });
      if (response.data.success) {
          message.success("인증 번호를 발송했습니다.");
          onPostSuccess(true);
      } else {
        message.error("인증 번호를 발송에 실패했습니다.");
        console.log("인증번호 발송 실패:", response.data);
      }
    } catch (error) {
      console.error(error);
      message.error("인증 번호를 발송에 실패했습니다.");
    }
    };
  return { handleSendVerifySms };
};

export default useSendVerifySms;
