import axios from 'axios';
import React, { Suspense } from 'react';
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import InventoryPage from "../src/pages/Inventory/Inventory";
import Mypage from "../src/pages/Mypage/Mypage";
import SalesPage from "../src/pages/Sales/Sales";
import "./App.css";
import Auth from "./hoc/auth.jsx";
import useInterval from './hooks/useInterval.jsx';
import HomePage from "./pages/Home/Home";
import MainPage from "./pages/Main/MainPage.jsx";

function App() {
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_ROOT;

  const NewLoginPage = Auth(MainPage, false);
  const NewHomePage = Auth(HomePage, true);
  const NewInventoryPage = Auth(InventoryPage, true);
  const NewSalesPage = Auth(SalesPage, true);
  const NewMyPage = Auth(Mypage, true);
  
  const expiredTime = 1000 * 60 * 60 * 24;
  useInterval(() => {
    console.log("!");
    if(
      cookies.refreshToken !== 'undefined' &&
      cookies.refreshToken !== undefined && 
      cookies.refreshToken 
    ){
      const config = {
        withCredentials: true,
      }
      axios.get(`${apiUrl}/api/v1/refresh/token`, config)
        .then((response) => {
          console.log(response);
          if (!response.data) {
              removeCookies();
              navigate('/');
          }
        })
        .catch((err) => {
          navigate("/");
        })
    }
  }, expiredTime - 60000);
  return (
    <div className="App">
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<NewLoginPage />} />
          <Route path="/home" element={<NewHomePage />} />
          <Route path="/Inventory" element={<NewInventoryPage />} />
          <Route path="/Sales" element={<NewSalesPage />} />
          <Route path="/Mypage" element={<NewMyPage />} />
        </Routes>
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

export default App;
