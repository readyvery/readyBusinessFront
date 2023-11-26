import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { selectStatus } from "../../Atom/order";
import "./MainHome.css";
import Complete from "./StatusHome/Complete";
import Progress from "./StatusHome/Progress";
import Wait from "./StatusHome/Wait";

const MainHome = () => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const setStatusSelect = useSetRecoilState(selectStatus);

  const [status, setStatus] = useState("Wait");

  const onClickHandler = (e) => {
    const name = e.target.id;
    setStatus(name);
    setStatusSelect("null")
  };

  const [waitInfo, setWaitInfo] = useState({});
  const [makeInfo, setMakeInfo] = useState({});
  const [completeInfo, setCompleteInfo] = useState({});

  const waitData = () => {
    const config = {
      withCredentials: true
    };
    
    axios.get(`${apiUrl}/api/v1/order?status=ORDER`, config)
      .then((res) => {
        console.log(res);
        setWaitInfo(res.data);
      })
      .catch((err) => {
        console.log(err)})
  }

  const makeData = () => {
    const config = {
      withCredentials: true
    };
    
    axios.get(`${apiUrl}/api/v1/order?status=MAKE`, config)
      .then((res) => {
        console.log(res);
        setMakeInfo(res.data);
      })
      .catch((err) => console.log(err))
  }

  const completeData = () => {
    const config = {
      withCredentials: true
    };
    
    axios.get(`${apiUrl}/api/v1/order?status=COMPLETE`, config)
      .then((res) => {
        console.log(res);
        setCompleteInfo(res.data);
      })
      .catch((err) => console.log(err))
  }

  const fetchData = () => {
    waitData();
    makeData();
    completeData();
  }

  useEffect(() => {
    fetchData();

  //   const intervalId = setInterval(fetchData, 5000); // 5초마다 실행

  //   return () => clearInterval(intervalId);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Main-Box">
      <div className="status-header">
        <div className="main-header__wrapper">
        <div className="main-header-btn__wrapper">
          <div
            id="Wait"
            className={`main-header-btn ${status === "Wait" && "selected"}`}
            onClick={onClickHandler}
          >
            대기 {waitInfo?.orders?.length > 0 ? waitInfo.orders?.length : 0}
          </div>
        </div>
        <div className="main-header-btn__wrapper">
          <div
            id="Progress"
            className={`main-header-btn ${status === "Progress" && "selected"}`}
            onClick={onClickHandler}
            
          >
            제조중 {makeInfo?.orders?.length > 0 ? makeInfo.orders?.length : 0}
          </div>
        </div>
        <div className="main-header-btn__wrapper">
          <div
            id="Complete"
            className={`main-header-btn ${status === "Complete" && "selected"}`}
            onClick={onClickHandler}
            
          >
            제조완료 {completeInfo?.orders?.length > 0 ? completeInfo?.orders?.length : 0}
          </div>
        </div>
        </div>
      </div>

      {status === "Wait" ? (
        <Wait orderInfo={waitInfo}/>
      ) : status === "Progress" ? (
        <Progress orderInfo={makeInfo}/>
      ) : status === "Complete" ? (
        <Complete orderInfo={completeInfo}/>
      ) : (
        <div>ERROR</div>
      )}
    </div>
  );
};

export default MainHome;
