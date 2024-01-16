import "./LoginChkAlrm.css";
import x_icon from "../../../assets/icons/icon_x.svg";
import chk_icon from "../../../assets/icons/icon_chk.svg";

const LoginChkAlrm=({ children, icon, paddingSize})=>{
    let SelectIcon = chk_icon;
    if(icon === "X"){
        SelectIcon = x_icon;
    }
    return(
        <div className="check-message">
            <img src={SelectIcon} alt={icon} style={{paddingRight: `${paddingSize}`}}/>
            <span>{children}</span>
        </div>
    )
}
export default LoginChkAlrm;