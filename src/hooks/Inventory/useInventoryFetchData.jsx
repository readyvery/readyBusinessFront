import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../../Atom/status";

const useInventoryFetchData = () => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const token = useRecoilValue(loginState);
  const [isCategoryList, setIsCategoryList] = useState([]);
  const [isInvenList, setIsInvenList] = useState([]);
  const fetchData = useCallback(async () => {
    const config = {
      // withCredentials: true, 
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    };
    try {
      const response = await axios.get(`${apiUrl}/api/v1/inventory`, config);
      setIsInvenList(response.data);
      setIsCategoryList(["전체", ...response.data.categorys.map((e) => e.name)]);
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl, setIsInvenList, setIsCategoryList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetchData, isCategoryList, isInvenList };
};

export default useInventoryFetchData;
