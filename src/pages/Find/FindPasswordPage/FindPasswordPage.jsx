import React from "react";
import Container from "../../../components/login/Container/Container";
import CertificationInput from "../../../components/login/Certification/CertificationInput/CertificationInput";

function FindPasswordPage () {
    return(
        <Container title={"비밀번호 찾기"} containerWidth={"25rem"} containerHeight={"30rem"} logoMarginTop={"4.55rem"} logoMarginBottom={"2.55rem"}>
            <div style={{marginTop:"2.85rem"}}>
                <CertificationInput 
                    id="userid" 
                    type="text"
                    placeholder="아이디"
                    requiredname="userid"
                    text="조회"
                    buttonText="다음"
                />
            </div>
        </Container>
    )
}
export default FindPasswordPage;