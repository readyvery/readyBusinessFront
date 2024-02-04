// InvenCategoryList.jsx
import React from "react";

const InvenCategoryList = ({ categoryList, handlechnCategory }) => {
  return (
    <div className="mainInven-category__modal">
      {categoryList?.map((category, index) => (
        <React.Fragment key={index}>
          <span onClick={() => handlechnCategory(category)}>{category}</span>
          <div className="mainInven-category__line"></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default InvenCategoryList;
