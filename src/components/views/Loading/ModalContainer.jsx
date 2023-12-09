import React from "react";
import { createPortal } from "react-dom";

function ModalContainer({ children }) {
  return createPortal(<>{children}</>, document.getElementById("loading"));
}

export default ModalContainer;
