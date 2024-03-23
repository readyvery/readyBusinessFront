import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../../Atom/status";
import useInventoryFetchData from "./useInventoryFetchData";

const useInventoryPatchData = () => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const { fetchData } = useInventoryFetchData();
  const token = useRecoilValue(loginState);
  const config = {
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
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
