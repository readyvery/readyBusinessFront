import axios from "axios";
import { useState } from "react";
import { useRecoilState } from 'recoil';
import { userIdState } from "../../../../Atom/status";
import LoginChkAlrm from "../../../login/LoginChkAlrm/LoginChkAlrm";
import "./UserInputId.css";

const UserInputId = () => {
    // 아이디 입력 값 처리
    const [inputId, setInputId] = useRecoilState(userIdState)
    const [inputIdError, setInputIdError] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(null);

    const isInputIdLength = (inputId) => {
        const minLength = 8;
        return inputId.length >= minLength;
    };

    const isInputIdCombinationValid = (inputId) => {
        const hasLetter = /[a-zA-Z]/.test(inputId);
        const hasNumber = /\d/.test(inputId);
        return hasLetter && hasNumber;
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
            }, {withCredentials: true})
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
        return handleDuplicate;
    }

    const renderMessage = (userInputId) => {
        if (inputIdError) {
            if (!isInputIdLength(userInputId)) {
                return <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>8자 이상 입력해야 합니다.</LoginChkAlrm>;
              } else if (!isInputIdCombinationValid(userInputId)) {
                return <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>영문+숫자의 조합이어야 합니다.</LoginChkAlrm>;
              } 
        } if (isDuplicate !== null) { // isDuplicate 상태가 null이 아닐 때만 메시지 렌더링
            if (isDuplicate === false) {
                return <LoginChkAlrm icon={""} paddingSize={"0.45rem"}>사용 가능한 아이디입니다.</LoginChkAlrm>;
            } else if (isDuplicate === true) {
                return <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>이미 사용 중인 아이디입니다.</LoginChkAlrm>;
            }
        }
        return null; 

      };

    return(
        <div className="signup-page-content-id-wrapper">
            <label className="signup-page-content-id-label-style">아이디</label>
            <div className="signup-page-content-id-label-plus-text">
                <div>영문+숫자+특수기호 8자 이상</div>
                <button className="duplication-check-button" onClick={handleDuplicate}>중복 확인</button>
            </div>
            <div>
                <input 
                    id="userid" 
                    type="text" 
                    placeholder="아이디" 
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