const InvenBox = ({handleModal, invenProps: {category, name, soldOut}}) => {
  return(
      <>
      <div className={`mainInven-category-content__box ${soldOut ? 'selected' : ''}`}>
        <span className="mainInven-category-content__span1">
          {!soldOut ? (
              <div className="mainInven-category-checkbox" onClick={handleModal}></div>
          ) : (
              <div className="mainInven-category-checkbox selected" onClick={handleModal}></div>
          )}
        </span>
        <span className="mainInven-category-content__span2">{category}</span>
        <span className="mainInven-category-content__span3">{name}</span>
      </div>
      </>
  );
}

export default InvenBox;