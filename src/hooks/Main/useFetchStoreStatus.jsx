import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { storeContextState } from "../../Atom/status";
import commonApis from "../../util/commonApis";

const apiUrl = `/store/sales`;

const useFetchStoreStatus = () => {
  const setStoreStatus = useSetRecoilState(storeContextState);
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchData = async () => {
    commonApis
      .get(apiUrl, config)
      .then((res) => {
        if (res.status === 200) {
          setStoreStatus(res.data.status);
          return res.data.status;
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return;
};

export default useFetchStoreStatus;
