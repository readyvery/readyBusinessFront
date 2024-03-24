import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useFindId = () => {
  const navigate = useNavigate();
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";
  const apiUrl = `${apiRoot}/${apiVer}/ceo/find/email`;

  const findIdResult = async ({ userPhonenumber }) => {
    try {
      const response = await axios.post(apiUrl, {
        phoneNumber: userPhonenumber,
      });
      if (response.data.success) {
        console.log(response.data.message);
        navigate("/find/id/search", {
          state: { message: response.data.message },
        });
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      // 404에러 처리(사용자 id가 db에 없을 경우)
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          navigate("/find/id/none");
        }
      }
      // 다른 오류 처리
      else {
        message.error("아이디 조회 요청에 실패했습니다.");
        console.error(error);
      }
    }
  };
  return { findIdResult, navigate };
};

export default useFindId;
