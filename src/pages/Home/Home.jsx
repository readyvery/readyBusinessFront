import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import MainHome from "./MainHome";
import Receipt from "./Receipt/Receipt";

function Home() {
  const apiUrl = process.env.REACT_APP_API_ROOT;

  const [waitInfo, setWaitInfo] = useState({});
  const [makeInfo, setMakeInfo] = useState({});
  const [completeInfo, setCompleteInfo] = useState({});

  const waitData = () => {
    const config = {
      withCredentials: true,
    };

    axios
      .get(`${apiUrl}/api/v1/order?status=ORDER`, config)
      .then((res) => {
        console.log(res);
        setWaitInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 404 && err.message === "Not found order.") {
          setWaitInfo({});
        }
      });
  };

  const makeData = () => {
    const config = {
      withCredentials: true,
    };

    axios
      .get(`${apiUrl}/api/v1/order?status=MAKE`, config)
      .then((res) => {
        console.log(res);
        setMakeInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 404 && err.message === "Not found order.") {
          setMakeInfo({});
        }
      });
  };

  const completeData = () => {
    const config = {
      withCredentials: true,
    };

    axios
      .get(`${apiUrl}/api/v1/order?status=COMPLETE`, config)
      .then((res) => {
        console.log(res);
        setCompleteInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 404 && err.message === "Not found order.") {
          setCompleteInfo({});
        }
      });
  };

  const fetchData = () => {
    waitData();
    makeData();
    completeData();
  };

  useEffect(() => {
    const fetchDataAndSetInterval = async () => {
      await fetchData();
    };

    fetchDataAndSetInterval();
    const intervalId = setInterval(waitData, 5000); // 5초마다 실행
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-wrapper">
      <main>
        <MainHome
          waitInfo={waitInfo}
          makeInfo={makeInfo}
          completeInfo={completeInfo}
        />
        <Receipt fetchData={fetchData} />
      </main>
    </div>
  );
}

export default Home;
