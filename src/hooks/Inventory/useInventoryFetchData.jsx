import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useInventoryFetchData = () => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const token = localStorage.getItem("accessToken");
  const [isCategoryList, setIsCategoryList] = useState([]);
  const [isInvenList, setIsInvenList] = useState([]);
  const fetchData = useCallback(async () => {
    const config = {
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(`${apiUrl}/api/v1/inventory`, config);
      setIsInvenList(response.data);
      setIsCategoryList([
        "전체",
        ...response.data.categorys.map((e) => e.name),
      ]);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, setIsInvenList, setIsCategoryList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetchData, isCategoryList, isInvenList };
};

export default useInventoryFetchData;
