import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="terms_of_service">서비스 이용약관</span>
      <span className="footer__line"></span>
      <span className="site_terms_of_use">사이트 이용약관</span>
      <span className="footer__line"></span>
      <span className="privacy_policy">개인정보처리방침</span>
    </footer>
  );
};

export default Footer;
