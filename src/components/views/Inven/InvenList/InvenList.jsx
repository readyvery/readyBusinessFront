import React from "react";
import InvenBox from "../InvenBox/InvenBox";
import "./InvenList.css";

const InvenList = ({ category, invenList, handleModal }) => (
  <div className="mainInven-category-content__wrapper">
    {invenList?.categorys
      ?.filter((cate) => category === "전체" || cate.name === category)
      ?.map((categoryItem) =>
        categoryItem?.foodies?.map((foodItem) => (
          <React.Fragment key={foodItem.idx}>
            <InvenBox
              handleModal={() => handleModal(foodItem.idx, foodItem.soldOut)}
              invenProps={{
                category: categoryItem.name,
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
