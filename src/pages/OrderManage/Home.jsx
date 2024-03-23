import React, { createContext, useState } from "react";
import styled from "styled-components";


import OrderContainer from "../../components/views/Home/OrderContainer";
import StatusBtn from "../../components/views/Home/StatusBtn";
import StatusHeader from "../../components/views/Home/StatusHeader";
import "./Home.css";
import MainHome from "./MainHome";
import Receipt from "./Receipt";

// Context API 적용
export const HomeContext = createContext(null);
function Home({ defaultValue, defaultStatus, defaultMenu, children }) { 

  // const waitInfo = useFetchWaitInfo();
  // const makeInfo = useFetchMakeInfo();
  // const completeInfo = useFetchCompletetInfo();
  // console.log(waitInfo);
  
  // Context API 적용 (status 관리)
  const [status, setStatus] = useState(defaultStatus);
  const [selectedIdx, setSelectedIdx] = useState(defaultValue);
  const [selectedMenu, setSelectedMenu] = useState(defaultMenu);
  const providerValue = { selectedIdx, setSelectedIdx, status, setStatus, selectedMenu, setSelectedMenu };


  // 소리 재생
  // const Mp = EffectSound(MP, 1);
  // const [sound] = useRecoilState(soundState);
  
  // useEffect(() => {
  //   console.log(sound);
  //   // console.log(waitInfo);
  //   if (sound && waitInfo?.orders?.length > 0) {
  //     console.log("소리 재생");
  //     Mp.play();
  //   }
  //   console.log(localStorage.accessToken);
  //   if (cookies.accessToken) {
  //     // const fetchDataAndSetInterval = async () => {
  //     //   await fetchData();
  //     // };

  //     // fetchDataAndSetInterval();
  //     // const intervalId = setInterval(waitData, 3000); // 5초마다 실행
  //     // return () => clearInterval(intervalId);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [waitInfo])
  // TODO:: 웹소켓을 써보고 싶다..나는..

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
  top: 6.5rem;
  width: 100vw;
  height: calc(100vh - 6.5rem);

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

Home.MainHome = MainHome;
Home.Receipt = Receipt;
Home.StatusHeader = StatusHeader;
Home.StatusBtn = StatusBtn;
Home.OrderContainer = OrderContainer;

export default Home;

