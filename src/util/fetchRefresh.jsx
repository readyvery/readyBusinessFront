import axios from "axios";
import { useEffect, useState } from "react";

const useRefresh = () => {
    const [response, setResponse] = useState(null);
    useEffect(() => {
        const fetchRefresh = async () => {
            try {
                const res = axios.get(process.env.REACT_APP_API_ROOT + "/api/v1/refresh/token", {
                    withCredentials: true
                });
                setResponse(res);
            } catch (e) {
                // refresh token 만료 시
                if (e?.response?.status === 401 || e?.response?.status === 403){
                    // 로그인 페이지로 이동
                    // window.location.href = "/";
                    alert('로그인을 다시 진행해 주세요.');
                }
            }
        }
        fetchRefresh();
    }, []);
    return response;
}

export default useRefresh;