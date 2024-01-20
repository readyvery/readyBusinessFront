import { message } from "antd";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { soundState } from "../../Atom/status";
import MP from "../../assets/Very.mp3";

import EffectSound from "../../utils/EffectSound";

import { selectId } from "../../Atom/order";
import OrderContainer from "../../components/views/Home/OrderContainer";
import StatusBtn from "../../components/views/Home/StatusBtn";
import StatusHeader from "../../components/views/Home/StatusHeader";
import useFetchCompletetInfo from "../../hooks/useFetchCompleteInfo";
import useFetchMakeInfo from "../../hooks/useFetchMakeInfo";
import useFetchWaitInfo from "../../hooks/useFetchWaitInfo";
import "./Home.css";
import MainHome from "./MainHome";
import Receipt from "./Receipt";

// Context API 적용
export const HomeContext = createContext(null);
function Home({ defaultValue, defaultStatus, children }) { 
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const navigate = useNavigate();

  // const [waitInfo, setWaitInfo] = useState({});
  // const [makeInfo, setMakeInfo] = useState({});
  // const [completeInfo, setCompleteInfo] = useState({});
  // const [pickUpInfo, setpickUpInfo] = useState({});
  const waitInfo = useFetchWaitInfo();
  const makeInfo = useFetchMakeInfo();
  const completeInfo = useFetchCompletetInfo();
  // console.log(waitInfo);
  const [, , removeCookie] = useCookies(["accessToken", "JSESSIONID"]);

  const [orderId, setOrderId] = useRecoilState(selectId);
  const [cookies] = useCookies(["accessToken"]);
  
  // Context API 적용
  const [status, setStatus] = useState(defaultStatus);
  const [selectedIdx, setSelectedIdx] = useState(defaultValue);
  const providerValue = { selectedIdx, setSelectedIdx, status, setStatus };


  const refreshToken = async () => {
    const config = {
      withCredentials: true,
    };

    try{
    const response = await axios
      .get(`${apiUrl}/api/v1/refresh/token`, config)
      console.log(response);
    } catch (err) {
      removeCookie("accessToken", { domain: process.env.REACT_APP_DOMAIN });
      removeCookie("JSESSIONID", { domain: process.env.REACT_APP_DOMAIN });
      message.info("토큰이 만료되었습니다. 로그인을 진행해주세요.");
      navigate("/");
    }
  };

  // const waitData = () => {
  //   const config = {
  //     withCredentials: true,
  //   };

  //   axios
  //     .get(`${apiUrl}/api/v1/order?status=ORDER`, config)
  //     .then((res) => {
  //       console.log(res);
  //       setWaitInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.status);
  //       console.log(err.message);
  //       if (err.status === 404 && err.message === "Not found order.") {
  //         setWaitInfo({});
  //       } 
  //       else if(err.response.status === 403 && err.response.data.message === "Access Denied"){
  //         refreshToken();
  //       }
  //     });
  // };

  // const makeData = () => {
  //   const config = {
  //     withCredentials: true,
  //   };

  //   axios
  //     .get(`${apiUrl}/api/v1/order?status=MAKE`, config)
  //     .then((res) => {
  //       console.log(res);
  //       setMakeInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.status);
  //       if (err.status === 404 && err.message === "Not found order.") {
  //         setMakeInfo({});
  //       }
  //       else if(err.response.status === 403 && err.response.data.message === "Access Denied"){
  //         refreshToken();
  //       }
  //     });
  // };

  // const completeData = () => {
  //   const config = {
  //     withCredentials: true,
  //   };

  //   axios
  //     .get(`${apiUrl}/api/v1/order?status=COMPLETE`, config)
  //     .then((res) => {
  //       console.log(res);
  //       setCompleteInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.status);
  //       if (err.status === 404 && err.message === "Not found order.") {
  //         setCompleteInfo({});
  //       }
  //       else if(err.response.status === 403 && err.response.data.message === "Access Denied"){
  //         refreshToken();
  //       }
  //     });
  // };


  // const fetchData = () => {
  //   waitData();
  //   makeData();
  //   completeData();
  // };

  // useEffect(() => {
  //   console.log(cookies.accessToken);
  //   if(cookies.accessToken){
  //     const fetchDataAndSetInterval = async () => {
  //       await fetchData();
  //     };

  //     fetchDataAndSetInterval();
  //     // const intervalId = setInterval(waitData, 3000); // 5초마다 실행
  //     // return () => clearInterval(intervalId);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // 소리 재생
  const Mp = EffectSound(MP, 1);
  const [sound] = useRecoilState(soundState);
  
  useEffect(() => {
    console.log(sound);
    // console.log(waitInfo);
    if (sound && waitInfo?.orders?.length > 0) {
      console.log("소리 재생");
      Mp.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitInfo])

  return (
    <HomeContext.Provider value={providerValue}>
      <Container>
        {children}
      </Container>
    </HomeContext.Provider>
  );
}

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 5.5rem;
  width: 100vw;
  height: calc(100vh - 5.5rem);
`;

Home.MainHome = MainHome;
Home.Receipt = Receipt;
Home.StatusHeader = StatusHeader;
Home.StatusBtn = StatusBtn;
Home.OrderContainer = OrderContainer;

export default Home;

