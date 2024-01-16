import React from "react";
import Container from "../../../components/login/Container/Container";
import CertificationInput from "../../../components/login/Certification/CertificationInput/CertificationInput";

function FindIdPage () {
    return(
        <Container title={"아이디 찾기"} containerWidth={"25rem"} containerHeight={"30rem"} logoMarginTop={"4.55rem"} logoMarginBottom={"2.55rem"}>
            <CertificationInput 
                id="userid" 
                type="tel"
                placeholder="전화번호"
                requiredname="username"
                text="인증"
                buttonText="확인"
               >
            </CertificationInput>
        </Container>
    )
}
export default FindIdPage;