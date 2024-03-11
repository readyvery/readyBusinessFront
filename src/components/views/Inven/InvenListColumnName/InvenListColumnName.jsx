import { IMAGES } from "../../../../constants/images";
import InvenCategoryList from "../InvenCategoryList/InvenCategoryList";
import "./InvenListColumnName.css";
const InvenListColumnName = ({
  category,
  isCategoryOpen,
  handleCategoryModal,
  categoryList,
  handlechnCategory,
}) => {
  return (
    <div className="mainInven-title__wrapper">
      <span className="mainInven-title__span1">품절</span>
      <div
        className="mainInven-title__span2__wrapper"
        onClick={handleCategoryModal}
      >
        <span style={{ width: "1.125rem" }}></span>
        <span className="mainInven-title__span2">{category}</span>
        {isCategoryOpen ? (
          <span>
            <img src={IMAGES.arrow_up} alt="upArrow" />
          </span>
        ) : (
          <span>
            <img src={IMAGES.arrow_down} alt="downArrow" />
          </span>
        )}
      </div>
      <span className="mainInven-title__span3">상품명</span>
      {isCategoryOpen && (
        <div className="mainInven-title__span2__category-wrapper">
          <InvenCategoryList
            categoryList={categoryList}
            handlechnCategory={(e) => handlechnCategory(e)}
          />
        </div>
      )}
    </div>
  );
};

export default InvenListColumnName;
