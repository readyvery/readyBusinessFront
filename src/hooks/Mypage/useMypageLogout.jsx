import { message } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedState } from "../../Atom/status";

// 수정필요! 백에서 로그아웃이 구현되면 ㄱㄱ
const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/user/logout`;

const useMypageLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const [, , removeCookie] = useCookies(["accessToken", "refreshToken", "JSESSIONID"]);
  // 반환된 함수가 실제로 호출되면 로그아웃을 수행
  const isTokenLogout = async () => {
    //   로컬스토리지에 엑세스토큰 저장시에.
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(apiUrl, config);
      if(response.status === 200 && response.data.success){
        console.log(response);
        setIsAuthenticated(false);
        localStorage.clear();
        removeCookie("JSESSIONID");
        removeCookie("accessToken");
        removeCookie("refreshToken");
        message.success("로그아웃에 성공하셨습니다.");
        navigate("/login");
      }
    } catch (error) {
      message.info("관리자에게 문의하세요.");
      // navigate("/");
    }
  };

  return { isTokenLogout };
};

export default useMypageLogout;
