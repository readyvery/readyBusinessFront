import { message } from "antd";
import axios from "axios";
import React, { Suspense } from "react";
import { useCookies } from "react-cookie";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header2 from "../src/components/views/Header/Header2";
import NavBar from "../src/components/views/NavBar/NavBar";
import InventoryPage from "../src/pages/Inventory/Inventory";
import Mypage from "../src/pages/Mypage/Mypage";
import SalesPage from "../src/pages/Sales/Sales";
import "./App.css";
import Auth from "./hoc/auth.jsx";
import useInterval from "./hooks/useInterval.jsx";
import HomePage from "./pages/Home/Home";
import MainPage from "./pages/Main/MainPage.jsx";

function App() {
  const [cookies, , removeCookies] = useCookies();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_ROOT;
  let location = useLocation();

  const NewLoginPage = Auth(MainPage, false);
  const NewHomePage = Auth(HomePage, true);
  const NewInventoryPage = Auth(InventoryPage, true);
  const NewSalesPage = Auth(SalesPage, true);
  const NewMyPage = Auth(Mypage, true);

  const expiredTime = 1000 * 60 * 60 * 24;
  // const expiredTime = 65000;
  useInterval(() => {
    // console.log(cookies.refreshToken);
    if (
      cookies.refreshToken !== "undefined" &&
      cookies.refreshToken !== undefined &&
      cookies.refreshToken
    ) {
    if (cookies.accessToken) {
      const config = {
        withCredentials: true,
      };
      axios
        .get(`${apiUrl}/api/v1/refresh/token`, config)
        .then((response) => {
          console.log(response);
          if (!response.data) {
            removeCookies();
            navigate("/");
          }
        })
        .catch((err) => {
          message.info("토큰이 만료되었습니다. 로그인을 진행해주세요.");
          navigate("/");
        });
    }
    }
  }, expiredTime - 60000);
  if (location.pathname === "/") {
    return (
      <div>
        <div className="App">
          <Routes>
            <Route path="/" element={<NewLoginPage />} />
            <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
          </Routes>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <Header2 />
      <nav>
        <NavBar />
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<NewHomePage />} />
          <Route path="/Inventory" element={<NewInventoryPage />} />
          <Route path="/Sales" element={<NewSalesPage />} />
          <Route path="/Mypage" element={<NewMyPage />} />
          <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
