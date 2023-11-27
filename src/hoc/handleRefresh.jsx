import axios from "axios";
import moment from "moment";
import { useCookies } from "react-cookie";
import { useRecoilState } from 'recoil';
import { loginState } from '../Atom/status';


const Refresh = async () => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);
  const expireAt = loginInfo.expiredTime;
  const [cookies] = useCookies(["accessToken"]);
  console.log("만료확인");

  // 토큰이 만료되었다면

  if (moment(expireAt).diff(moment()) < 0) {
    const config = {
        withCredentials: true
    }

    console.log("토큰을 재발급합니다!");

    //재발급 요청
    const res = await axios.get(
      `${apiUrl}/api/v1/refresh/token`,
      config
    );
    console.log("재발급 성공", res);
    setLoginInfo({
        accessToken: cookies,
        expiredTime: moment().add(1, "hour").format("yyyy-MM-DD HH:mm:ss")
    });

    return true;
  } else {return false;}
};

const refreshErrorHandle = () => {
  //Cookie.remove("refreshToken");
};

export { Refresh, refreshErrorHandle };

