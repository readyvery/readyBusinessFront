import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Header2 from "../src/components/views/Header/Header2";
// import Auth from "./hoc/auth.jsx";
import ApplicationForm from "./components/signup/ApplicationForm/ApplicationForm.jsx";
import FindIdPage from "./pages/Find/FindIdPage/FindIdPage.jsx"; //아이디 찾기-전화번호 인증
import NoneFindIdPage from "./pages/Find/FindIdPage/NoneFindIdPage/NoneFindIdPage.jsx"; //아이디 찾기 결과-회원 X
import UserFindIdPage from "./pages/Find/FindIdPage/UserFindIdPage/UserFindIdPage.jsx"; //아이디 찾기 결과-아이디 반환
import ChangeNewPasswordPage from "./pages/Find/FindPasswordPage/ChangePasswordPage/ChangeNewPasswordPage/ChangeNewPasswordPage.jsx"; //비밀번호 변경 - 새 비밀번호 인증
import ChangePasswordPage from "./pages/Find/FindPasswordPage/ChangePasswordPage/ChangePasswordPage.jsx"; //비밀번호 변경 - 전화번호 인증
import FindPasswordPage from "./pages/Find/FindPasswordPage/FindPasswordPage.jsx"; //비밀번호 찾기 - 아이디 조회
import InventoryPage from "./pages/Inventory/Inventory/InventoryPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import MainPage from "./pages/Main/MainPage.jsx";
import MyPage from "./pages/Mypage/Mypage.jsx";
import OrderManagePage from "./pages/OrderManage/Order.jsx";
import SalesManage from "./pages/SalesManage/SalesManage.jsx";
import JudgeResultsBeforePage from "./pages/Signup/JudgeResults/JudgeResultsBeforePage.jsx";
import JudgeResultsRejectPage from "./pages/Signup/JudgeResults/JudgeResultsReject/JudgeResultsRejectPage.jsx";
import PhoneAuthPage from "./pages/Signup/PhoneAuth/PhoneAuthPage.jsx";
import SignupPage from "./pages/Signup/SignupPage.jsx";
import TermsPage from "./pages/Signup/Terms/TermsPage.jsx";
import VerificationPage from "./pages/Signup/Verification/VerificationPage.jsx";
import StoreManage from "./pages/StoreManage/StoreManage.jsx";
import Auth from "./utils/Auth.jsx";

function App() {
  //const [cookies, , removeCookies] = useCookies();
  let location = useLocation();

  // 로그인 필요없는 페이지
  // sms인증 구현으로 인한 AUTH잠시 해제
  // const NewSignupPage = Auth(SignupPage, false); // 회원가입
  const NewLoginPage = Auth(LoginPage, false); // 로그인
  // sms인증 구현으로 인한 AUTH잠시 해제
  // const NewFindIdPage = Auth(FindIdPage, false); //아이디 찾기-전화번호 인증
  const NewNoneFindIdPage = Auth(NoneFindIdPage, false); //아이디 찾기 결과-회원 X
  const NewUserFindIdPage = Auth(UserFindIdPage, false); //아이디 찾기 결과-아이디 반환
  const NewFindPasswordPage = Auth(FindPasswordPage, false); //비밀번호 찾기 - 아이디 조회
  const NewChangeNewPasswordPage = Auth(ChangeNewPasswordPage, false); //비밀번호 변경 - 전화번호 인증
  const NewChangePasswordPage = Auth(ChangePasswordPage, false); //비밀번호 변경 - 전화번호 인증
  //const NewPhoneAuthPage = Auth(PhoneAuthPage, false); // 휴대폰 인증
  const NewTermsPage = Auth(TermsPage, false); // 이용약관 페이지

  // 로그인 필수 페이지
  // USER : 1, REVIEW : 2, REJECT : 3, READY : 4, CEO : 5
  const NewApplicationForm = Auth(ApplicationForm, true, 1); // 입점신청서 가입 전 알림 페이지
  const NewVerificationPage = Auth(VerificationPage, true, 1) // 입점신청서 페이지
  const NewJudgeResultsBeforePage = Auth(JudgeResultsBeforePage, true, 2); // 입점신청서 신청 완료 페이지
  const NewJudgeResultsRejectPage = Auth(JudgeResultsRejectPage, true, 3); // 입점 심사 반려 페이지
  // const NewMainPage = Auth(MainPage, true, 4); // 메인페이지 (4, 5)
  const NewStoreManage = Auth(StoreManage, true, 4); // 매장관리 페이지 (4, 5)
  // const NewOrderManagementPage = Auth(OrderManagePage, true, 5); // 주문관리
  const NewInventoryPage = Auth(InventoryPage, true, 5); // 재고관리
  const NewSalesPage = Auth(SalesManage, true, 5); // 매출관리
  const NewMyPage = Auth(MyPage, true, 5); // 마이페이지

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/store" element={<NewStoreManage />} />
          <Route path="/order" element={<OrderManagePage />} />
          <Route path="/inventory" element={<NewInventoryPage />} />
          <Route path="/sales" element={<NewSalesPage />} />
          <Route path="/mypage" element={<NewMyPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* 추가 */}
          <Route path="/signup/auth/phone" element={<PhoneAuthPage />} />
          <Route
            path="/signup/auth/verification"
            element={<NewVerificationPage />}
          />
          <Route path="/signup/auth/terms" element={<NewTermsPage />} />
          <Route path="/signup/auth/results" element={<NewApplicationForm />} />
          <Route
            path="/signup/auth/results/before"
            element={<NewJudgeResultsBeforePage />}
          />
          <Route
            path="/signup/auth/results/reject"
            element={<NewJudgeResultsRejectPage />}
          />
          <Route path="/login" element={<NewLoginPage />} />
          <Route path="/find/id" element={<FindIdPage />} />
          <Route path="/find/id/serch" element={<NewUserFindIdPage />} />
          <Route path="/find/id/none" element={<NewNoneFindIdPage />} />
          <Route path="/find/password" element={<NewFindPasswordPage />} />
          <Route
            path="/find/password/change"
            element={<NewChangePasswordPage />}
          />
          <Route
            path="/find/password/change/user"
            element={<NewChangeNewPasswordPage />}
          />
          {/* <Route path="/*" element={<Navigate to="/"></Navigate>}></Route> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
