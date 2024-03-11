import X from "../../../assets/icons/X.svg";
import "../../../pages/OrderManage/Receipt.css";

export default function ReciptModal ({ children, closeModal, title }) {
    return (
        <div className="modal-wrapper">
            <div className="modal-box">
                <div
                  className="modal-close__wrapper"
                  onClick={() => closeModal((prev) => !prev)}
                >
                  <img src={X} alt="close" />
                </div>
                <div className="modal-box-txt__wrapper">
                  <div className="modal-box-txt">{title}</div>
                </div>
                {children}
            </div>
        </div>
    );
};