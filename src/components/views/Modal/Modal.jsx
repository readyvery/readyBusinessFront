import cherry from "../../../assets/icons/small_cherry.svg";
import X from "../../../assets/icons/X.svg";
import "./Modal.css";

const Modal = ({ handleCancle, handleCheck, title }) => {
  return (
    <div className="modal__wrapper">
      <div className="modal__box">
        <img src={X} alt="X" className="modal__close" onClick={handleCancle} />
        <div>
          <img src={cherry} alt="berry" className="modal__berry" />
        </div>
        <div className="modal__title">{title}</div>
        <div className="modal__check" onClick={handleCheck}>
          확인
        </div>
      </div>
    </div>
  );
};

export default Modal;
