import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from '../Atom/status';
import commonApis from '../util/commonApis';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const navigate = useNavigate();
        const token = useRecoilValue(loginState);
        
        useEffect(() => {
            async function fetchAuth() {
                try{
                    const response = await commonApis.get("/auth", {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`
                        }
                    })
                    console.log(response);
                    const { auth } = response.data; // 로그인 여부
                    const { role } = response.data; // GUEST, USER, CEO
                    console.log(auth, role, option, adminRoute);

                    if (!auth) {
                        // 로그인 안 한 상태
                        if (option) {
                            navigate("/login");
                        }
                    } else {
                        // 로그인 한 상태
                        switch (role) {
                            case 'GUEST':
                                // 회원가입만 완료
                                if(adminRoute !== 1) {
                                    // 인증창으로 이동
                                    navigate('/signup/auth/phone');
                                }
                                break;

                            case 'USER':
                                // 회원가입, 인증 완료
                                if (adminRoute !== 2) {
                                    // 입점신청서창으로 이동
                                    navigate('/signup/auth/results');
                                }
                                break;

                            case 'Wait':
                                // 회원가입, 인증, 입점신청서 대기
                                if (adminRoute !== 3){
                                    // 입점신청서 대기창으로 이동
                                    navigate("/signup/auth/before");
                                }
                                break;

                            case 'CEO':
                                // 회원가입, 인증, 입점신청서 완료
                                if (adminRoute !== 4){
                                    // 홈으로 이동
                                    navigate("/order");
                                }
                                break;
                            default:

                        }
                    }
                } catch(error){
                    console.log(error);
                    if (
                        error.response &&
                        error.response?.status >= 400 &&
                        error.response?.status < 500
                    ) {
                        // 클라이언트 오류 발생 (400번대 오류)
                        // 로그인 페이지로 되돌아가는 조건문 추가
                        navigate('/login');
                    } else {
                        // 서버 오류 또는 네트워크 오류 등의 다른 오류 처리
                    }
                }
            }
            fetchAuth();

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return <SpecificComponent />;
    }
    return AuthenticationCheck;
}
