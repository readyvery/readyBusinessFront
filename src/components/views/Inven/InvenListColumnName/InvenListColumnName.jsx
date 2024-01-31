import downArrow from "../../../../assets/icons/icon_downArrow.svg";
import upArrow from "../../../../assets/icons/icon_upArrow.svg";
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
            <img src={downArrow} alt="downArrow" />
          </span>
        ) : (
          <span>
            <img src={upArrow} alt="upArrow" />
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
