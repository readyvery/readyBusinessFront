import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  userConfirmPasswordState,
  userIdState,
  userNameState,
  userPasswordState,
} from "../Atom/status";

// 회원가입 폼
const usePhoneNumberVerificationForSignup = () => {
  const navigate = useNavigate();
  const userId = useRecoilValue(userIdState);
  const userPassword = useRecoilValue(userPasswordState);
  const userConfirmPassword = useRecoilValue(userConfirmPasswordState);
  const userName = useRecoilValue(userNameState);

  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";
  const apiUrl = `${apiRoot}/${apiVer}/user/join`;
  const handleJoinClick = async ({ verifyState, userPhonenumber }) => {
    if (verifyState) {
      try {
        const response = await axios.post(apiUrl, {
          email: userId,
          password: userPassword,
          confirmPassword: userConfirmPassword,
          name: userName,
          phone: userPhonenumber,
        });
        console.log(response);

        if (response.data.success) {
          console.log("회원가입 성공: ", response.data);
          message.info("회원가입이 완료되었습니다.");
          navigate("/login");
        } else {
            message.error(response.data.message);
            // 이미 가입이력이 있는 ... 어디로 가야할지
          console.log("회원가입 실패: ", response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("번호인증을 진행해주세요!");
    }
  };
  return { handleJoinClick };
};
export default usePhoneNumberVerificationForSignup;
