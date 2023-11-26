import moment from "moment";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getUserSelector, loginState } from "../Atom/status";

function Auth(SpecificComponent, option) {
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = useRecoilValue(getUserSelector);
    // const tokenInfo = useRecoilValue(getAuthenticatedSelector);
    const setIsLoggedIn = useSetRecoilState(loginState);
    const [cookies] = useCookies(["accessToken"]);

    useEffect(() => {
      console.log(userInfo);
      // console.log(tokenInfo);
      console.log(window.localStorage.getItem("isAuthenticated"));
      console.log(cookies?.accessToken);
      const isAuth = window.localStorage.getItem("isAuthenticated");
      if (userInfo === "404" && location.pathname !== "/") {
        navigate("/");
      } else {
        // if(userInfo !== "404"){
        //   const tokenInfo = useRecoilValue(getAuthenticatedSelector);
        //   console.log(tokenInfo);
        // }
        if (!window.localStorage.getItem("isAuthenticated") && cookies?.accessToken) {
          // 첫 로그인 시
          window.localStorage.setItem("isAuthenticated", true);
          setIsLoggedIn({
            accessToken: getAccessTokenFromCookie(),
            expiredTime: moment().add(1, "hour").format("yyyy-MM-DD HH:mm:ss"),
          });
          navigate("/home");
          alert("로그인에 성공하셨습니다.");
        } else {
          if (cookies?.accessToken && location.pathname === "/") {
            // 로그인 상태에서 로그인 화면으로 갔을 경우
            navigate("/home");
          }
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}

export const getAccessTokenFromCookie = () => {
  const cookieString = document.cookie;
  if (cookieString) {
    const cookies = cookieString.split("; ");

    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "accessToken") {
        return value;
      }
    }
  }
  return null;
};

export default Auth;
