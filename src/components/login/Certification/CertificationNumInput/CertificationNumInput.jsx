import React, { useState, useEffect } from "react";
import LoginChkAlrm from "../../LoginChkAlrm/LoginChkAlrm";
import "./CertificationNumInput.css";

const AUTH_CODE = "1234";//서버에서 받아오는 값
const TIMER_DURATION = 600;//타이머 시간 설정(600초)

const Timer = ({ minutes, seconds }) => (
  <div className="timer">
    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  </div>
);


function CertificationNumInput(){
  const [chkNum, setChkNum] = useState("");
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimer]);

  const handleInputText = (e) => {
    const newChkNum = e.target.value;
    setChkNum(newChkNum);
    equlChknum(newChkNum, AUTH_CODE);
  };
  
  const equlChknum = (inputNum, serverNum) => {
    if (serverNum === inputNum) {
      setIsAuth(true);
    } else if (serverNum !== inputNum) {
      setIsAuth(false);
    } else {
      setIsAuth(null);
    }
  };
  

  const renderMessage = () => {
    if (timer <= 0) {
      return <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>인증 시간이 초과되었습니다.</LoginChkAlrm>;
    } else if (timer > 0 && !isAuth) {
      return <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>인증번호가 일치하지 않습니다.</LoginChkAlrm>;
    } else if (timer > 0 && isAuth) {
      return <LoginChkAlrm icon={""} paddingSize={"0.45rem"}>인증이 완료되었습니다.</LoginChkAlrm>;
    }
  };

  return (
    <>
      <div className="loginpage-user-num-input-style">
        <div>
          <input
            id="username"
            type="text"
            placeholder="인증번호"
            required
            name="username"
            value={chkNum}
            onChange={handleInputText}
            className="loginpage-user-auth-num"
          />
          {timer > 0 && <Timer minutes={Math.floor(timer / 60)} seconds={timer % 60} />}
        </div>
      </div>

      <div>{renderMessage()}</div>
    </>
  );
};

export default CertificationNumInput;
