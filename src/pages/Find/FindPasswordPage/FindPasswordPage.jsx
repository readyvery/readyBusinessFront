import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { findPasswordState } from "../../../Atom/status";
import Container from "../../../components/login/Container/Container";
import RedButton from "../../../components/login/redButton/RedButton";
import "./FindPasswordPage.css";
function FindPasswordPage() {
  // 화면 사이즈 검사
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "37.5rem", "4.13rem", "6.5rem"]
    : ["31.3rem", "37.5rem", "5.56rem", "6.81rem"];
  useEffect(() => {
    const handleResize = () => {
      setIs480(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 1. 아이디 조회 -> 조회성공 시 전화번호 입력페이지
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const setPasswordState = useSetRecoilState(findPasswordState);
  const handleCheckId = (event) => {
    setId(event.target.value);
  };
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";
  // 해당 바꾸기
  const apiUrl = `${apiRoot}/${apiVer}/ceo/find/password/email`;
  const handleIdDuplicateCheck = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (id === "") {
      message.error("아이디를 입력해주세요.");
      return;
    } else if (emailRegex) {
      try {
        const response = await axios.post(`${apiUrl}`, {
          email: id,
        });

        if (response.data.success) {
          setPasswordState({
            email: id,
            phoneNumber: response.data.message,
          });
          message.success("아이디 조회에 성공했습니다.");
          navigate(`/find/password/change`);
        }
      } catch (error) {
        // 404에러 처리(사용자 id가 db에 없을 경우)
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 404) {
            message.error("존재하지 않는 아이디 입니다.");
            setId("");
          }
        }
        // 다른 오류 처리
        else {
          message.error("아이디 조회 요청에 실패했습니다.");
        }
      }
    } else {
      message.error("올바른 메일 주소를 입력해주세요.");
      return;
    }
  };
  return (
    <Container
      title={"비밀번호 찾기"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div>
        <div className="loginpage-find-password-check-id-wrapper">
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={handleCheckId}
          />
        </div>
        <div className="loginpage-find-password-next-button">
          <RedButton onClick={handleIdDuplicateCheck}>다음</RedButton>
        </div>
      </div>
    </Container>
  );
}
export default FindPasswordPage;
