import React from "react";
import Container from "../../../../components/login/Container/Container";
import CertificationInput from "../../../../components/login/Certification/CertificationInput/CertificationInput";

function ChangePasswordPage () {
    const is480 = window.innerWidth <= 480;
    const containerSize = is480
      ? ["20rem", "30rem", "3.3rem"]
      : ["25rem", "30rem", "4.55rem"]
    
    return(
        <Container title={"비밀번호 찾기"} containerWidth={containerSize[0]} containerHeight={containerSize[1]} logoMarginTop={containerSize[2]} logoMarginBottom={"2.55rem"}>
            <div style={{marginTop:"0.25rem"}}>
                <CertificationInput 
                    id="userid" 
                    type="tel"
                    placeholder="전화번호"
                    requiredname="username"
                    text="인증"
                    buttonText="확인"
                />
            </div>
        </Container>
    )
}
export default ChangePasswordPage;