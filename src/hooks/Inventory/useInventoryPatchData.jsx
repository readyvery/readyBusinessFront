import axios from "axios";
import useInventoryFetchData from "./useInventoryFetchData";

const useInventoryPatchData = () => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const { fetchData } = useInventoryFetchData();
  const token = localStorage.getItem("accessToken");
  const config = {
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const patchData = async (currentBox) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/api/v1/inventory`,
        currentBox,
        config
      );
      console.log(res.data);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return { patchData };
};

export default useInventoryPatchData;
