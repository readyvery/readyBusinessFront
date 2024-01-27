import axios from "axios";

const commonApis = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT + "/api/v1",
    timeout: 120000,
    withCredentials: true
});


// commonApis.interceptors.request.use(
//     (config) => {
//         const loginToken = useRecoilValue(loginState);
//         console.log(loginToken);
//         if (loginToken.accessToken) {
//             config.headers['Authorization'] = `Bearer ${loginToken.accessToken}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

commonApis.interceptors.response.use(
    (res) => { return res },
    async (err) => {
        const {
            config,
            response,
        } = err;
        console.log(err);
        // access token 만료 시
        if (response?.status === 403) {
            try {
                async function fetchRefresh () {
                    const res = await axios.get(process.env.REACT_APP_API_ROOT + "/api/v1/refresh/token", {
                        withCredentials: true
                    });
                    return res;
                }
                const response = fetchRefresh();
                const accessToken = response.data.accessToken;
                config.headers.common["Authorization"] = "Bearer " + accessToken;
                return config;
            } catch (e) {
                // refresh token 만료 시
                if (e?.response?.status === 401 || e?.response?.status === 403){
                    // 로그인 페이지로 이동
                    window.location.href = "/login";
                    alert('로그인을 다시 진행해 주세요.');
                }
            }
            // const response = useRefresh();
            // const { accessToken } = response.data;
            // config.headers.common["Authorization"] = "Bearer " + accessToken;
            return config;
        }
        return Promise.reject(err);
    }
)

export default commonApis;
