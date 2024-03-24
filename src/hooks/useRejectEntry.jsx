import { message } from "antd";
import commonApis from "../util/commonApis";

const apiUrl = `/ceo/entry/reject`;

const useRejectEntry = () => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
    const rejectEntry = () => {
        commonApis
        .get(`${apiUrl}`, config)
        .then((res) => {
            if (res.status === 200 && res.data.success) {
                message.success(res.data.message);
            }
        })
        .catch((err) => console.log(err));
    };
    return rejectEntry;
};

export default useRejectEntry;
