import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Header2 from "../src/components/views/Header/Header2";
// import Auth from "./hoc/auth.jsx";
import Auth from "./utils/Auth.jsx";
// import MainPage from "./pages/Main/MainPage.jsx";
// 추가 페이지
import InventoryPage from "./pages/Inventory/Inventory.jsx";
import MyPage from "./pages/Mypage/Mypage.jsx";
import OrderManagePage from "./pages/OrderManage/Order.jsx";
import SalesPage from "./pages/Sales/Sales.jsx";

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
import HomePage from "./pages/HomePage/HomePage.jsx";

function App() {
  //const [cookies, , removeCookies] = useCookies();
  let location = useLocation();

  // 로그인 필요없는 페이지
  const NewSignupPage = Auth(SignupPage, false); // 회원가입
  const NewLoginPage = Auth(LoginPage, false); // 로그인
  const NewFindIdPage = Auth(FindIdPage, false); //아이디 찾기-전화번호 인증
  const NewNoneFindIdPage = Auth(NoneFindIdPage, false); //아이디 찾기 결과-회원 X
  const NewUserFindIdPage = Auth(UserFindIdPage, false); //아이디 찾기 결과-아이디 반환
  const NewFindPasswordPage = Auth(FindPasswordPage, false); //비밀번호 찾기 - 아이디 조회

  // 로그인 필수 페이지
  // GUEST : 1, USER : 2, CEO : 3

  const NewPhoneAuthPage = Auth(PhoneAuthPage, true, 1); // 휴대폰 인증
  // 유저전용 메인페이지 (2)
  // CEO전용 메인페이지 (3)
  const NewOrderManagementPage = Auth(OrderManagePage, true, 3); // 주문관리
  const NewInventoryPage = Auth(InventoryPage, true, 3); // 재고관리
  const NewSalesPage = Auth(SalesPage, true, 3); // 매출관리
  const NewMyPage = Auth(MyPage, true, 3); // 마이페이지

  if (location.pathname === "/") {
    return (
      <div>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
          </Routes>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      {/* <Header2 /> */}
      {/* <nav>
        <NavBar />
      </nav> */}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/order" element={<NewOrderManagementPage />} />
          <Route path="/Inventory" element={<NewInventoryPage />} />
          <Route path="/Sales" element={<NewSalesPage />} />
          <Route path="/Mypage" element={<NewMyPage />} />
          <Route path="/signup" element={<NewSignupPage />} />
          {/* 추가 */}
          <Route path="/signup/auth/phone" element={<NewPhoneAuthPage />} />
          <Route
            path="/signup/auth/verification"
            element={<VerificationPage />}
          />
          <Route path="/signup/auth/terms" element={<TermsPage />} />
          <Route path="/signup/auth/results" element={<ApplicationForm />} />
          <Route
            path="/signup/auth/results/before"
            element={<JudgeResultsBeforePage />}
          />
          <Route
            path="/signup/auth/results/reject"
            element={<JudgeResultsRejectPage />}
          />
          <Route path="/login" element={<NewLoginPage />} />
          <Route path="/find/id" element={<NewFindIdPage />} />
          <Route path="/find/id/serch" element={<NewUserFindIdPage />} />
          <Route path="/find/id/none" element={<NewNoneFindIdPage />} />
          <Route path="/find/password" element={<NewFindPasswordPage />} />
          <Route
            path="/find/password/change"
            element={<ChangePasswordPage />}
          />
          <Route
            path="/find/password/change/user"
            element={<ChangeNewPasswordPage />}
          />
          {/* <Route path="/*" element={<Navigate to="/"></Navigate>}></Route> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
