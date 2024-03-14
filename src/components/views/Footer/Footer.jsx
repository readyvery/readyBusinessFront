import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Link
        to={"https://readyberry.notion.site/b68ddd36b1b0429089a6e12cffcdc876"}
        className="footer__link"
      >
        서비스 이용약관
      </Link>
      <span className="footer__line"></span>
      <Link
        to={"https://readyberry.notion.site/292eb070d30f4330a64ea3d52f67a62e"}
        className="footer__link"
      >
        사이트 이용약관
      </Link>
      <span className="footer__line"></span>
      <Link
        to={"https://readyberry.notion.site/1ee0f5fd9c3f45778883f30119409c64"}
        className="footer__link"
      >
        개인정보처리방침
      </Link>
    </footer>
  );
};

export default Footer;
