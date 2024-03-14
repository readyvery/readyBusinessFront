import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { findPasswordState } from "../../../../Atom/status";
import LoginChkAlrm from "../../LoginChkAlrm/LoginChkAlrm";
import "./CertificationInputCheck.css";

// const AUTH_CODE = "1234";//서버에서 받아오는 값
const TIMER_DURATION = 600; //타이머 시간 설정(600초)

const Timer = ({ minutes, seconds }) => (
  <div className="timer">
    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  </div>
);
// 비밀번호 변경 번호 인증_인증번호 확인
// 추후 아이디 찾기 및 회원가입 번호인증과 비교 후 수정 필요
function CertificationInputCheck({ phoneNumber }) {
  const [chkNum, setChkNum] = useState("");
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [isAuth, setIsAuth] = useState();
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const setPasswordState = useSetRecoilState(findPasswordState);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimer]);

  const handleInputText = async (e) => {
    const newChkNum = e.target.value;
    setChkNum(newChkNum);
    if (newChkNum.length === 6) {
      try {
        const response = await axios.post(
          `${apiUrl}/api/v1/sms/verify/find-email`,
          {
            phoneNumber: phoneNumber,
            verifyNumber: newChkNum,
          }
        );

        if (response.data.success) {
          console.log("인증성공", response.data);
          setIsAuth(true);
          setPasswordState({
            verify: true,
          });
        } else {
          console.log("인증실패", response.data);
          setIsAuth(false);
        }
      } catch (error) {
        console.log("통신에러", error);
      }
    }
  };

  const renderMessage = () => {
    if (timer <= 0) {
      return (
        <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
          인증 시간이 초과되었습니다.
        </LoginChkAlrm>
      );
    } else if (timer > 0 && !isAuth) {
      return (
        <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
          인증번호가 일치하지 않습니다.
        </LoginChkAlrm>
      );
    } else if (timer > 0 && isAuth) {
      return (
        <LoginChkAlrm icon={""} paddingSize={"0.45rem"}>
          인증이 완료되었습니다.
        </LoginChkAlrm>
      );
    }
  };

  return (
    <>
      <div className="loginpage-user-num-input-style">
        <input
          id="username"
          type="text"
          placeholder="인증번호"
          value={chkNum}
          autocomplete="off" //자동완성 없애기
          onChange={handleInputText}
        />
        {timer > 0 && (
          <Timer minutes={Math.floor(timer / 60)} seconds={timer % 60} />
        )}
      </div>
      <div>{renderMessage()}</div>
    </>
  );
}

export default CertificationInputCheck;
