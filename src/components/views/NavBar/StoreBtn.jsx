import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selectStoreState } from "../../../Atom/status";
import StoreOn from "../../../assets/icons/Navbar/Store.svg"; //영업중

function StoreBtn () {
    // const [Store] = useRecoilState(storeState); // 영업여부
    // const setStoreState = useRecoilCallback(({ set }) => async () => {
    //     console.log(Store, storeState);
    //     set(storeState, !Store);
    //   });
    const baseUrl = process.env.REACT_APP_API_ROOT;
    const currentState = useRecoilValue(selectStoreState);
    console.log(currentState);

    // 값을 설정하기
    const [store, setStore] = useState(null);
    
    const onClickHandler = (e) => {
      const config = {
        withCredentials: true
      };
  
      axios.post(`${baseUrl}/api/v1/store/sales`, {
        status: !store
      }, config)
        .then((res) => {
          console.log(res);
          setStore(res.data.status);
        })
        .catch((err) => console.log(err))
      // axios
      //   .post(`${apiUrl}+/api/v1/store/sales`)
      //   .then((Store) => {
      //     console.log(Store);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    };
    return(
        <Link style={{'textDecoration': 'none'}}>
        {store ? (
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
      </Link>
    )
}

export default React.memo(StoreBtn);