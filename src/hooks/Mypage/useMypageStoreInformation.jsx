import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../../Atom/status";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/user/info`;

const useMypageStoreInformation = () => {
  const [getCafeInfo, setGetCafeInfo] = useState({});
  const token = useRecoilValue(loginState);
      const config = {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    };
  useEffect(() => {
    axios.get(apiUrl,config)
      .then((response) => {
        setGetCafeInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);
  console.log("flxjsgkf", getCafeInfo);
  return { getCafeInfo };
};

export default useMypageStoreInformation;
