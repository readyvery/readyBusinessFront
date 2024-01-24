import React from "react";
import InvenBox from "./InvenBox";
import "./InvenList.css"

const InvenList = ({ category, invenList, handleModal }) => (
  <div className="mainInven-category-content__wrapper">
    {invenList
      .filter((cate) => category === "전체" || cate.category === category)
      .map((categoryItem) =>
        categoryItem.foodies.map((foodItem) => (
          <React.Fragment key={foodItem.idx}>
            <InvenBox
              handleModal={() => handleModal(foodItem.idx, foodItem.soldOut)}
              invenProps={{
                category: categoryItem.category,
                name: foodItem.name,
                soldOut: foodItem.soldOut,
              }}
            />
          </React.Fragment>
        ))
      )}
  </div>
);

export default InvenList;
