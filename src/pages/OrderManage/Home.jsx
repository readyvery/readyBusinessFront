import React, { createContext, useState } from "react";
import styled from "styled-components";


import Header from "../../components/views/Header/HeaderOrder/Header2";
import OrderContainer from "../../components/views/Home/OrderContainer";
import StatusBtn from "../../components/views/Home/StatusBtn";
import StatusHeader from "../../components/views/Home/StatusHeader";
import "./Home.css";
import MainHome from "./MainHome";
import Receipt from "./Receipt";

// Context API 적용
export const HomeContext = createContext(null);
function Home({ defaultValue, defaultStatus, defaultMenu, children }) { 
  
  // Context API 적용 (status 관리)
  const [status, setStatus] = useState(defaultStatus);
  const [selectedIdx, setSelectedIdx] = useState(defaultValue);
  const [selectedMenu, setSelectedMenu] = useState(defaultMenu);
  const providerValue = { selectedIdx, setSelectedIdx, status, setStatus, selectedMenu, setSelectedMenu };


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

Home.Header = Header;
Home.MainHome = MainHome;
Home.Receipt = Receipt;
Home.StatusHeader = StatusHeader;
Home.StatusBtn = StatusBtn;
Home.OrderContainer = OrderContainer;

export default Home;

