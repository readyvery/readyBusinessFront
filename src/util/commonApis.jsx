import axios from "axios";
import { useNavigate } from "react-router-dom";

const commonApis = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT + "/api/v1",
    timeout: 120000,
    withCredentials: true
});


commonApis.interceptors.request.use(
    async (config) => {
        const loginStateValue = localStorage.getItem('accessToken');
        if (loginStateValue) {
            config.headers['Authorization'] = `Bearer ${loginStateValue}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


commonApis.interceptors.response.use(
    (res) => { return res },
    (err) => {
        const {
            // config,
            response,
        } = err;
        const navigate = useNavigate();
        console.log(err);
        // access token 만료 시
        if (response?.status === 403) {
            navigate("/");
            // axios.get(process.env.REACT_APP_API_ROOT + "/api/v1/refresh/token", {
            //     withCredentials: true
            // })
            // .then((res) => {
            //     console.log(res);
            //     const accessToken = res.data.accessToken;
            //     // console.log('accessToken: ', accessToken);
            //     if(accessToken){
            //         console.log("access token 재설정!");
            //         console.log(accessToken);
            //         localStorage.setItem('accessToken', accessToken);
            //         localStorage.setItem("expiredTime", moment().add(1, "days").format("yyyy-MM-DD HH:mm:ss"))
            //         axios.defaults.headers.common.Authorization = "Bearer " + accessToken;
            //         config.headers.common["Authorization"] = "Bearer " + accessToken;
            //     }
            //     return axios(config);
            // })
            // .catch((e) => {
            //     if (e?.response?.status === 401 || e?.response?.status === 403){
            //         // 로그인 페이지로 이동
            //         window.location.href = "/login";
            //     }
            // });
            // return config;
        }
        return Promise.reject(err);
    }
)

export default commonApis;
