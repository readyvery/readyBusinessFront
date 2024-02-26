
import { IMAGES } from "../../../constants/images";
import "../../../pages/OrderManage/Receipt.css";

export default function ReciptModal ({ children, handleOrder, closeModal, title }) {
    return (
        <div className="modal-wrapper">
            <div className="modal-box">
                <div
                  className="modal-close__wrapper"
                  onClick={() => closeModal((prev) => !prev)}
                >
                  <img src={IMAGES.check_x_gray} alt="close" />
                </div>
                <div className="modal-box-txt__wrapper">
                  <div className="modal-box-txt">{title}</div>
                </div>
                {children}
            </div>
        </div>
    );
};