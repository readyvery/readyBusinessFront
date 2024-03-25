import axios from "axios";
import React, { useState } from "react";
import useTimer from "../../../../../hooks/useTimer";
import LoginChkAlrm from "../../../../login/LoginChkAlrm/LoginChkAlrm";
import "./UserInputNumberMessage.css";

const Timer = ({ minutes, seconds }) => (
  <div className="timer">
    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  </div>
);

function UserInputNumberMessage({ phoneNumber, onAuthSuccess, initialTimer }) {
  const [chkNum, setChkNum] = useState("");
  const { timer } = useTimer(initialTimer);
  const [isAuth, setIsAuth] = useState();
  const apiUrl = process.env.REACT_APP_API_ROOT;

  const handleInputText = async (e) => {
    const newChkNum = e.target.value;
    setChkNum(newChkNum);
    if (newChkNum.length === 6) {
      try {
        const response = await axios.post(`${apiUrl}/api/v1/sms/verify`, {
          phoneNumber: phoneNumber,
          verifyNumber: newChkNum,
        });

        if (response.data.success) {
          console.log("인증성공", response.data);
          setIsAuth(true);
          onAuthSuccess(true);
        } else {
          console.log("인증실패", response.data);
          setIsAuth(false);
          onAuthSuccess(true);
        }
      } catch (error) {
        console.log("통신에러", error);
      }
    } else {
      onAuthSuccess(false);
      setIsAuth(false);
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
      <div className="user-input-number-message-wrapper">
        <input
          id="usermessage"
          type="text"
          placeholder="인증번호"
          autocomplete="off" //자동완성 없애기
          value={chkNum}
          maxLength="6"
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

export default UserInputNumberMessage;
