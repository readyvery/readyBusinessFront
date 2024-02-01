import { useState } from "react";
import { useRecoilState } from 'recoil';
import { userIdState } from "../../../../Atom/status";
import LoginChkAlrm from "../../../login/LoginChkAlrm/LoginChkAlrm";
import "./UserInputId.css";

const UserInputId = () => {
    // 아이디 입력 값 처리
    const [inputId, setInputId] = useRecoilState(userIdState)
    const [inputIdError, setInputIdError] = useState(false);
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
      };
      const validateUserInputId = (userInputId) => {
        if (!isInputIdLength(userInputId)) {
            setInputIdError(true);
        } else if (!isInputIdCombinationValid(userInputId)) {
            setInputIdError(true);
        } else {
            setInputIdError(false);
        }
      };

    return(
        <div className="signup-page-content-id-wrapper">
            <label className="signup-page-content-id-label-style">아이디</label>
            <div className="signup-page-content-id-label-plus-text">
                <div>영문+숫자+특수기호 8자 이상</div>
                <button className="duplication-check-button">중복 확인</button>
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
            {inputIdError ? (
                    <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
                    { !isInputIdLength(inputId)
                    ? "8자 이상 입력해야 합니다."
                    : !isInputIdCombinationValid(inputId)
                    ? "영문+숫자의 조합이어야 합니다."
                    : null}
                </LoginChkAlrm>
                ) : <div style={{minHeight: "0.9rem"}}/>
            }
        </div>
    )
}
export default UserInputId;