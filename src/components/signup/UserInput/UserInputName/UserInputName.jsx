import LoginChkAlrm from "../../../login/LoginChkAlrm/LoginChkAlrm";
import "./UserInputName.css";
import { useState } from "react";

const UserInputName = () => {
    // 아이디 입력 값 처리
    const [inputName, setInputName] = useState("");
    const [inputNameError, setInputNameError] = useState(false);
    const isInputNameLength = (inputName) => {
        const minLength = 0;
        return inputName.length > minLength;
      };

      const handleInputChange = (e) => {
        const userInputName = e.target.value;
        setInputName(userInputName);
        validateUserInputName(userInputName);
      };
      const validateUserInputName = (userInputName) => {
        if (!isInputNameLength(userInputName)) {
            setInputNameError(true);
        }else {
            setInputNameError(false);
        }
      };
    return(
        <div className="signup-page-content-name-wrapper">
            <label className="signup-page-content-name-label-style">대표자명</label>
            <div>
                <input 
                    id="username" 
                    type="text" 
                    placeholder="대표자명" 
                    required name="userid"             
                    value={inputName}
                    onChange={handleInputChange}
                    className="signup-page-content-name-input"/>
            </div>
            {inputNameError ? (
                    <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
                    { !isInputNameLength(inputName)
                    ? "공백이 아니여야합니다."
                    : null}
                </LoginChkAlrm>
                ) : <div style={{minHeight: "0.9rem"}}/>
            }
        </div>
    )
}
export default UserInputName;