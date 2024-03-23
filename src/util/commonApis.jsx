import axios from "axios";

const commonApis = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT + "/api/v1",
    timeout: 120000,
    withCredentials: true
});


commonApis.interceptors.request.use(
    async (config) => {
        const loginStateValue = localStorage.getItem('accessToken');
        console.log('commonApi: ', loginStateValue);
        // const expired = Refresh();
        // console.log('expired: ', expired);
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
            config,
            response,
        } = err;
        console.log(err);
        // access token 만료 시
        if (response?.status === 403) {
            axios.get(process.env.REACT_APP_API_ROOT + "/api/v1/refresh/token", {
                withCredentials: true
            })
            .then((res) => {
                console.log(res);
                const accessToken = res.data.accessToken;
                // console.log('accessToken: ', accessToken);
                if(accessToken){
                    console.log("access token 재설정!");
                    console.log(accessToken);
                    localStorage.setItem('accessToken', accessToken);
                    axios.defaults.headers.common.Authorization = "Bearer " + accessToken;
                    config.headers.common["Authorization"] = "Bearer " + accessToken;
                }
                return axios(config);
            })
            .catch((e) => {
                if (e?.response?.status === 401 || e?.response?.status === 403){
                    // 로그인 페이지로 이동
                    window.location.href = "/login";
                    alert('로그인을 다시 진행해 주세요.');
                }
            });
            return config;
        }
        return Promise.reject(err);
    }
)

export default commonApis;
