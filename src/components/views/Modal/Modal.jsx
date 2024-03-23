import { IMAGES } from "../../../constants/images";
import "./Modal.css";

const Modal = ({ handleCancle, handleCheck, title }) => {
  return (
    <div className="modal__wrapper">
      <div className="modal__box">
        <img src={IMAGES.check_x_gray} alt="X" className="modal__close" onClick={handleCancle} />
        <div>
          <img src={IMAGES.cherry_red} alt="berry" className="modal__berry" />
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
