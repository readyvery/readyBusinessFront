import axios from "axios";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectStoreState } from "../../../Atom/status";
import StoreOn from "../../../assets/icons/Navbar/Store.svg"; //영업중

function StoreBtn() {
  // const [Store] = useRecoilState(storeState); // 영업여부
  // const setStoreState = useRecoilCallback(({ set }) => async () => {
  //     console.log(Store, storeState);
  //     set(storeState, !Store);
  //   });
  const baseUrl = process.env.REACT_APP_API_ROOT;

  // 값을 설정하기
  const storeValue = useRecoilValue(selectStoreState); // 가게 영업 여부를 가져옵니다
  const setSelectStore = useSetRecoilState(selectStoreState); // 가게 영업 여부를 설정합니다

  const onClickHandler = (e) => {
    let body = {
      status: !storeValue,
    };
    const config = {
      withCredentials: true,
    };

    axios
      .post(`${baseUrl}/api/v1/store/sales`, body, config)
      .then((response) => {
        console.log(response.data.status);
        setSelectStore(response.data.status);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {storeValue ? (
        <div className="icon-group">
          <img
            className="icon"
            onClick={onClickHandler}
            src={StoreOn}
            alt="Open"
          />
          <span className="menu-font">영업중</span>
        </div>
      ) : (
        <div className="icon-off">
          <img
            className="icon"
            onClick={onClickHandler}
            src={StoreOn}
            alt="Close"
          />
          <span className="menu-font">영업종료</span>
        </div>
      )}
    </div>
  );
}

export default StoreBtn;
