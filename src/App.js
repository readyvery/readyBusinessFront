import { message } from "antd";
import axios from "axios";
import React, { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import Header2 from "../src/components/views/Header/Header2";
import NavBar from "../src/components/views/NavBar/NavBar";
import InventoryPage from "../src/pages/Inventory/Inventory";
import Mypage from "../src/pages/Mypage/Mypage";
import SalesPage from "../src/pages/Sales/Sales";
import "./App.css";
import Auth from "./hoc/auth.jsx";
import useInterval from "./hooks/useInterval.jsx";
import HomePage from "./pages/Home/Home";
// import MainPage from "./pages/Main/MainPage.jsx";
// 추가 페이지
import ApplicationForm from "./components/signup/ApplicationForm/ApplicationForm.jsx";
import FindIdPage from "./pages/Find/FindIdPage/FindIdPage.jsx"; //아이디 찾기-전화번호 인증
import NoneFindIdPage from "./pages/Find/FindIdPage/NoneFindIdPage/NoneFindIdPage.jsx"; //아이디 찾기 결과-회원 X
import UserFindIdPage from "./pages/Find/FindIdPage/UserFindIdPage/UserFindIdPage.jsx"; //아이디 찾기 결과-아이디 반환
import ChangeNewPasswordPage from "./pages/Find/FindPasswordPage/ChangePasswordPage/ChangeNewPasswordPage/ChangeNewPasswordPage.jsx"; //비밀번호 변경 - 새 비밀번호 인증
import ChangePasswordPage from "./pages/Find/FindPasswordPage/ChangePasswordPage/ChangePasswordPage.jsx"; //비밀번호 변경 - 전화번호 인증
import FindPasswordPage from "./pages/Find/FindPasswordPage/FindPasswordPage.jsx"; //비밀번호 찾기 - 아이디 조회
import LoginPage from "./pages/Login/LoginPage.jsx";
import JudgeResultsBeforePage from "./pages/Signup/JudgeResults/JudgeResultsBeforePage.jsx";
import JudgeResultsRejectPage from "./pages/Signup/JudgeResults/JudgeResultsReject/JudgeResultsRejectPage.jsx";
import PhoneAuthPage from "./pages/Signup/PhoneAuth/PhoneAuthPage.jsx";
import SignupPage from "./pages/Signup/SignupPage.jsx";
import TermsPage from "./pages/Signup/Terms/TermsPage.jsx";
import VerificationPage from "./pages/Signup/Verification/VerificationPage.jsx";

function App() {
  //const [cookies, , removeCookies] = useCookies();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_ROOT;
  let location = useLocation();

  const NewLoginPage = Auth(LoginPage, false);
  const NewHomePage = Auth(HomePage, true); 
  const NewInventoryPage = Auth(InventoryPage, true);
  const NewSalesPage = Auth(SalesPage, true);
  const NewMyPage = Auth(Mypage, true);

  const expiredTime = 1000 * 60 * 60 * 24;
  // const expiredTime = 65000;
  useInterval(() => {
    // console.log(cookies.refreshToken);
    console.log(localStorage.accessToken)
    if (
      localStorage.refreshToken !== "undefined" &&
      localStorage.refreshToken !== undefined &&
      localStorage.refreshToken
    ) {
    if (localStorage.accessToken) {
      const config = {
        withCredentials: true,
      };
      axios
        .get(`${apiUrl}/api/v1/refresh/token`, config)
        .then((response) => {
          console.log(response);
          if (!response.data) {
            localStorage.clear()
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
      {/* <Header2 /> */}
      <nav>
        <NavBar />
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<NewLoginPage />} />
          <Route path="/home" element={<NewHomePage />} />
          <Route path="/Inventory" element={<NewInventoryPage />} />
          <Route path="/Sales" element={<NewSalesPage />} />
          <Route path="/Mypage" element={<NewMyPage />} />
          <Route path="/signup" element={<SignupPage />} /> 
          {/* 추가 */}
          <Route path="/signup/auth/phone" element={<PhoneAuthPage />} />
          <Route path="/signup/auth/verification" element={<VerificationPage />} />
          <Route path="/signup/auth/terms" element={<TermsPage />} />
          <Route path="/signup/auth/results" element={<ApplicationForm />} />
          <Route path="/signup/auth/results/before" element={<JudgeResultsBeforePage />} />
          <Route path="/signup/auth/results/reject" element={<JudgeResultsRejectPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/find/id" element={<FindIdPage />} />
          <Route path="/find/id/serch" element={<UserFindIdPage />} />
          <Route path="/find/id/none" element={<NoneFindIdPage />} />
          <Route path="/find/password" element={<FindPasswordPage />} />
          <Route path="/find/password/change" element={<ChangePasswordPage />} />
          <Route path="/find/password/change/user" element={<ChangeNewPasswordPage />} />
          <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
