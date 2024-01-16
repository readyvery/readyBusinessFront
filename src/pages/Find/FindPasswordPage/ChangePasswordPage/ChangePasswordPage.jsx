import React from "react";
import Container from "../../../../components/login/Container/Container";
import CertificationInput from "../../../../components/login/Certification/CertificationInput/CertificationInput";

function ChangePasswordPage () {
    return(
        <Container title={"비밀번호 변경"} containerWidth={"25rem"} containerHeight={"30rem"} logoMarginTop={"4.55rem"} logoMarginBottom={"2.55rem"}>
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