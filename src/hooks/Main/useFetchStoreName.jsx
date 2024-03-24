import { useEffect, useState } from "react";
import commonApis from "../../util/commonApis";

const apiUrl = `/user/name`;

const useFetchStoreName = () => {
  const [info, setInfo] = useState("");
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      commonApis
        .get(`${apiUrl}`, config)
        .then((res) => {
          if (res.status === 200) {
            setInfo(res.data.name);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return info;
};

export default useFetchStoreName;
