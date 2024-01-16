import React from 'react';
import "./RedButton.css";
const RedButton=({ type, className, children, ...rest })=>{
    return(
        <button type={type} className="red-button">{children}</button>
    )
}
export default RedButton;