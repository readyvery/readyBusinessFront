import { message } from "antd";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectStoreState, soundState } from "../../../Atom/status";
import StoreOn from "../../../assets/icons/Navbar/Store.svg"; //영업중

function StoreBtn() {
  // const [Store] = useRecoilState(storeState); // 영업여부
  // const setStoreState = useRecoilCallback(({ set }) => async () => {
  //     console.log(Store, storeState);
  //     set(storeState, !Store);
  //   });
  const baseUrl = process.env.REACT_APP_API_ROOT;
  const navigate = useNavigate();
  const setSound = useSetRecoilState(soundState);
  const [, , removeCookie] = useCookies(["accessToken", "JSESSIONID"]);

  // 값을 설정하기
  const storeValue = useRecoilValue(selectStoreState); // 가게 영업 여부를 가져옵니다
  const setSelectStore = useSetRecoilState(selectStoreState); // 가게 영업 여부를 설정합니다

  // const onClickHandler = (e) => {
  //   let body = {
  //     status: !storeValue,
  //   };
  //   const config = {
  //     withCredentials: true,
  //   };

  //   axios
  //     .post(`${baseUrl}/api/v1/store/sales`, body, config)
  //     .then((response) => {
  //       console.log(response.data.status);
  //       setSelectStore(response.data.status);
  //     })
  //     .catch((err) => console.log(err));

  //   // 토큰 갱신 (안쪽 렌더링 발생)
    // axios
    //   .get(`${baseUrl}/api/v1/refresh/token`, config)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     removeCookie("accessToken", { domain: process.env.REACT_APP_DOMAIN });
    //     removeCookie("JSESSIONID", { domain: process.env.REACT_APP_DOMAIN });
    //     message.info("토큰이 만료되었습니다. 로그인을 진행해주세요.");
    //     navigate("/");
    //   });

  //   // 소리 값 초기화
  //   setSound(false);
  // };

  const onClickHandler = async (e) => {
    try {
      let body = {
        status: !storeValue,
      };
      const config = {
        withCredentials: true,
      };
  
      // Make the sales API call
      const salesResponse = await axios.post(`${baseUrl}/api/v1/store/sales`, body, config);
      console.log(salesResponse.data.status);
      setSelectStore(salesResponse.data.status);
  
      // Refresh token
      const refreshTokenResponse = await axios.get(`${baseUrl}/api/v1/refresh/token`, config);
      console.log(refreshTokenResponse);
  
      // Reset sound value
      setSound(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response.status === 401) {
          // Handle token expiration
          removeCookie("accessToken", { domain: process.env.REACT_APP_DOMAIN });
          removeCookie("JSESSIONID", { domain: process.env.REACT_APP_DOMAIN });
          message.info("토큰이 만료되었습니다. 로그인을 진행해주세요.");
          navigate("/");
        } else {
          // Handle other errors
          console.log(error);
        }
      } else {
        // Handle non-Axios errors
        console.log(error);
      }
    }
  };
  
  return (
    <div>
      {storeValue ? (
        <div className="icon-group">
          <img
            className="icon"
            onClick={onClickHandler}
            src={StoreOn}
            alt="Open"
          />
          <span className="menu-font">영업중</span>
        </div>
      ) : (
        <div className="icon-off">
          <img
            className="icon"
            onClick={onClickHandler}
            src={StoreOn}
            alt="Close"
          />
          <span className="menu-font">영업종료</span>
        </div>
      )}
    </div>
  );
}

export default StoreBtn;
