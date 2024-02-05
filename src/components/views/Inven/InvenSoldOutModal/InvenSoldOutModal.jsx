import close from "../../../../assets/icons/icon_closeModal.svg";
import cherry from "../../../../assets/icons/small_cherry.svg";
import "./InvenSoldOutModal.css";

const InvenSoldOutModal = ({
  contenttxt,
  requestid,
  handleIsCloseModal,
  handlePatchData,
}) => {
  return (
    <div className="inven-modal-wrapper">
      <div className="inven-modal-box">
        <div className="inven-modal-close__wrapper">
          <img src={close} alt="close" onClick={handleIsCloseModal} />
        </div>

        <div className="inven-modal-box-wrapper">
          <div className="inven-modal-box-img__wrapper">
            <img src={cherry} alt="cherry" />
          </div>
          <div className="inven-modal-box-txt__wrapper">
            <div className="inven-modal-box-txt">{contenttxt}</div>
          </div>

          <div
            className="inven-modal-box-close-btn"
            id={requestid}
            onClick={(e) => handlePatchData(e)}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  );
};
export default InvenSoldOutModal;
