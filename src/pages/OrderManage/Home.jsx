import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { soundState } from "../../Atom/status";
import MP from "../../assets/Very.mp3";

import EffectSound from "../../utils/EffectSound";

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
function Home({ defaultValue, defaultStatus, defaultMenu, children }) { 
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const navigate = useNavigate();

  const waitInfo = useFetchWaitInfo();
  const makeInfo = useFetchMakeInfo();
  const completeInfo = useFetchCompletetInfo();
  // console.log(waitInfo);
  const [, , removeCookie] = useCookies(["accessToken", "JSESSIONID"]);

  const [cookies] = useCookies(["accessToken"]);
  
  // Context API 적용 (status 관리)
  const [status, setStatus] = useState(defaultStatus);
  const [selectedIdx, setSelectedIdx] = useState(defaultValue);
  const [selectedMenu, setSelectedMenu] = useState(defaultMenu);
  const providerValue = { selectedIdx, setSelectedIdx, status, setStatus, selectedMenu, setSelectedMenu };


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
    console.log(localStorage.accessToken);
    if (cookies.accessToken) {
      // const fetchDataAndSetInterval = async () => {
      //   await fetchData();
      // };

      // fetchDataAndSetInterval();
      // const intervalId = setInterval(waitData, 3000); // 5초마다 실행
      // return () => clearInterval(intervalId);
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

