import React from "react";
import "./Container.css";
import logo from "../../../assets/icons/Big_LOGO.svg";

const Container = ({ title, children, containerWidth, containerHeight, logoMarginTop, logoMarginBottom }) =>{
    return(
        <div className="container-wrapper">
            <div className="container-wrapper-inner" style={{ 'width': `${containerWidth}`, 'height': `${containerHeight}`, 'overflow': 'visible' }}>
                <div className="container-wrapper-wrapper"style={{ 'marginTop': `${logoMarginTop}`, 'marginBottom': `${logoMarginBottom}`}}>
                    <span><img src={logo} alt="logo" style={{ 'width': '5.05rem', 'height': '1.25rem'}} /></span>
                    <div className="container-wrapper-text">{title}</div>
                </div>
                <div className="loginpage-content-wrapper">
                     <div className="loginpage-content">
                         { children }
                     </div>
                 </div>
            </div>
        </div>
    )
}

export default Container;