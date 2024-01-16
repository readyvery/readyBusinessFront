import "./CircleNumBar.css";
const CircleNumBar = ({ step }) => {
    const NumBar = ({ isPoint }) => {
        const barClassName = isPoint ? 'bar-wapper-point' : 'bar-wapper-not-point';
        return(
            <div className={`bar-wapper ${barClassName}`}/>
        )
    }
    const CircleNumWrapper = ({ text, isPoint, children }) => {
        const wrapperClassName = isPoint ? 'circle-num-wapper-point' : 'circle-num-wapper-not-point';
        return (
            <div className={`circle-num-wapper ${wrapperClassName}`}>
                {text}
                <div>
                    {children}
                </div>
            </div>
        );
    }
    const CircleNumText = ({ bartext, isPoint}) => {
        const textClassName = isPoint ? 'circle-num-bar-text-point' : 'circle-num-bar-text-not-point';
        return(
        <div className="circle-num-ber-text-wrapper">
            <div className={`circle-num-bar-text-content ${textClassName}`}>
                {bartext}
            </div>
         </div>
        )
    }
    return (
        <div>
        <div className="circle-num-ber-wrapper">
            <CircleNumWrapper text="1" isPoint={step >= 1}>
                <CircleNumText bartext="회원가입" isPoint={step >= 1}/>
            </CircleNumWrapper>
            <NumBar isPoint={step >= 2} />
            <CircleNumWrapper text="2" isPoint={step >= 2}>
                <CircleNumText bartext="입점 신청서 입력" isPoint={step >= 2}/>
            </CircleNumWrapper>
            <NumBar isPoint={step >= 3} />
            <CircleNumWrapper text="3" isPoint={step >= 3} >
                <CircleNumText bartext="입점 신청 완료" isPoint={step >= 3}/>
            </CircleNumWrapper>
        </div>
        </div>
    );
};

export default CircleNumBar;