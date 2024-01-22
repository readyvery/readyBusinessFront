import axios from "axios";

const commonApis = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT + "/api/v1",
    timeout: 120000,
    withCredentials: true
});

// commonApis.interceptors.request.use((config) => {
//     const loginToken = useRecoilValue(loginState);
//     console.log(loginToken);
//     if (loginToken.accessToken) {
//         config.headers['Authorization'] = `Bearer ${loginToken.accessToken}`;
//     }
//     return config;
// });

// commonApis.interceptors.request.use(
//     config => {
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

// 토큰 만료 시 refresh token 재발급
// commonApis.interceptors.response.use(
//     (res) => res,
//     async (err) => {
//         // const {
//         //     config,
//         //     response: { status }
//         // } = err;
//         console.log(err);
//         // access token 만료 시
//         // if (status === 403) {
//         //     try {
//         //         const res = await axios.get("/refresh/token", {
//         //             withCredentials: true
//         //         });
//         //         const accessToken = res.data.accessToken;
//         //         config.headers.common["Authorization"] = "Bearer " + accessToken;
//         //         return axios(config);
//         //     } catch (e) {
//         //         // refresh token 만료 시
//         //         if (e?.response?.status === 401 || e?.response?.status === 403){
//         //             // 로그인 페이지로 이동
//         //             // window.location.href = "/";
//         //             alert('로그인을 다시 진행해 주세요.');
//         //         }
//         //     }
//         // }
//     }
// )

export default commonApis;
