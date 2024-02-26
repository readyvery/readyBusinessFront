import { IMAGES } from "../../../../constants/images";
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
          <img src={IMAGES.check_x_gray} alt="close" onClick={handleIsCloseModal} />
        </div>

        <div className="inven-modal-box-wrapper">
          <div className="inven-modal-box-img__wrapper">
            <img src={IMAGES.cherry_red} alt="cherry" />
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
