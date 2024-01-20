import axios from "axios";

const commonApis = axios.create({
    // baseURL: process.env.REACT_APP_API_URL + "/api/v1",
    baseURL: process.env.REACT_APP_API_ROOT + "/api/v1",
    // headers: {
    //     Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNTI0MDgwMywidXNlck51bWJlciI6NywiZW1haWwiOiIxMjIzdkBuYXZlci5jb20ifQ.tcGWmvPgn_h6uQMbZ5AqHFQfmFr490rb7JBURvNYaSGwXgKVwubye8Tg0MQvKGqj4DdrGH9DAtISExvkPest9Q`
    // },
    timeout: 120000,
    withCredentials: true
});

// 토큰 만료 시 refresh token 재발급
commonApis.interceptors.response.use(
    (res) => res,
    async (err) => {
        const {
            config,
            response: { status }
        } = err;
        console.log(err);
        // access token 만료 시
        if (status === 403) {
            try {
                const res = await axios.get("/refresh/token", {
                    withCredentials: true
                });
                const accessToken = res.data.accessToken;
                config.headers.common["Authorization"] = "Bearer " + accessToken;
                return axios(config);
            } catch (e) {
                // refresh token 만료 시
                if (e?.response?.status === 401 || e?.response?.status === 403){
                    // 로그인 페이지로 이동
                    window.location.href = "/";
                    alert('로그인을 다시 진행해 주세요.');
                }
            }
        }
    }
)

export default commonApis;