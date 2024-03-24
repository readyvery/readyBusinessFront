import { message } from "antd";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { getPhoneNumber } from "../Atom/status";

// 비밀번호 찾기 - 인증번호 발송 로직
const useSendPasswordVerifySms = () => {
  const setPhoneNumberState = useSetRecoilState(getPhoneNumber);
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";
  const apiUrl = `${apiRoot}/${apiVer}/sms/send/find-email`;

  const handleSendPasswordVerifySms = async ({
    userPhonenumber,
    onPostSuccess,
    info,
  }) => {
    try {
      const response = await axios.post(`${apiUrl}`, {
        email: info.userEmail,
        phoneNumber: userPhonenumber,
        name: info.userName,
      });
      if (response.data.success) {
        message.success("인증 번호를 발송했습니다.");
        setPhoneNumberState({
          phoneNumber: userPhonenumber,
        });
        onPostSuccess(true);
      } else {
        message.error("인증 번호를 발송에 실패했습니다.");
        console.log("인증번호 발송 실패:", response.data);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          message.error("올바른 정보를 입력해주세요.");
        }
      } else {
        message.error("인증 번호 전송이 실패했습니다.");
      }
    }
  };
  return { handleSendPasswordVerifySms };
};

export default useSendPasswordVerifySms;
