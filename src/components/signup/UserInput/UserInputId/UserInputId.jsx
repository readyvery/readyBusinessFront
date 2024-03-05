import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { userIdDuplicateState, userIdState } from "../../../../Atom/status";
import LoginChkAlrm from "../../../login/LoginChkAlrm/LoginChkAlrm";
import "./UserInputId.css";

const UserInputId = () => {
    // 아이디 입력 값 처리
    const [inputId, setInputId] = useRecoilState(userIdState)
    const [inputIdError, setInputIdError] = useState(false);
    const [isDuplicate, setIsDuplicate] = useRecoilState(userIdDuplicateState);
    
    useEffect(() => {
        // isDuplicate 상태가 변경된 후 수행할 작업
        console.log("isDuplicate 상태가 변경되었습니다:", isDuplicate);
        // 추가적인 작업을 여기에 구현할 수 있습니다.
    }, [isDuplicate]);

    const isInputIdLength = (inputId) => {
        const minLength = 8;
        return inputId.length >= minLength;
    };

    const isInputIdCombinationValid = (inputId) => {
        // const hasLetter = /[a-zA-Z]/.test(inputId);
        // const hasNumber = /\d/.test(inputId);
        // return hasLetter && hasNumber;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(inputId);
    };

    const handleInputChange = (e) => {
        const userInputId = e.target.value;
        setInputId(userInputId);
        validateUserInputId(userInputId);
        setIsDuplicate(null);
    };

    const validateUserInputId = (userInputId) => {
        if (!isInputIdLength(userInputId)) {
            setInputIdError(true);
        } else if (!isInputIdCombinationValid(userInputId)) {
            setInputIdError(true);
        } // else if (!isInputIdDuplicate()) {
          //  setInputIdError(true);
      //  } 
        else {
            setInputIdError(false);
        }
    };

    const handleDuplicate = async () => {
        const apiUrl = process.env.REACT_APP_API_ROOT;

        try {
            const response = await axios.post(`${apiUrl}/api/v1/user/duplicate/check`, {
              email: inputId
            })
            console.log(response);

            if (response.data.success) {
                console.log("중복검사 성공:", response.data);
                setIsDuplicate(false);
            } else {
              console.log("즁복검사 실패:", response.data);
              setIsDuplicate(true);
            }
          } catch (error) {
            console.error("중복검사 요청 실패:", error);
            setIsDuplicate(null);
        }
    }

    const renderMessage = (userInputId) => {
        if (inputIdError) {
            if (!isInputIdCombinationValid(userInputId)) {
                return <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>올바른 형식의 이메일이 아닙니다.</LoginChkAlrm>;
              } 
        } if (isDuplicate !== null) { // isDuplicate 상태가 null이 아닐 때만 메시지 렌더링
            if (isDuplicate === false) {
                return <LoginChkAlrm icon={""} paddingSize={"0.45rem"}>사용 가능한 아이디입니다.</LoginChkAlrm>;
            } else if (isDuplicate === true) {
                return <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>이미 존재하는 아이디입니다.</LoginChkAlrm>;
            }
        }
        return null;
      };

    return(
        <div className="signup-page-content-id-wrapper">
            <div className="signup-page-content-id-label-plus-text">
                <label className="signup-page-content-id-label-style">아이디</label>
                <button 
                    className={`duplication-check-button ${isDuplicate === false ? "duplication-check-button-inactive" : ""}`}
                    onClick={handleDuplicate}>중복 확인</button>
            </div>
            <div>
                <input 
                    id="userid" 
                    type="text" 
                    placeholder="아이디 입력(이메일)" 
                    required name="userid"             
                    value={inputId}
                    onChange={handleInputChange}
                    className="signup-page-content-id-input"/>
            </div>
            <div>{renderMessage(inputId)}</div>
        </div>
    )
}
export default UserInputId;