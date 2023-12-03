import "./Dropdown.css";
function Dropdown({ onClickViewer }) {
  const onClick = (view) => {
    onClickViewer(view);
    console.log(view);
  };
  return (
    <>
      <span className="Dropdown-box" onClick={() => onClick("All")}>
        전체보기
      </span>
      <span className="Dropdown-box" onClick={() => onClick("PickUp")}>
        픽업대기
      </span>
      <span className="Dropdown-box" onClick={() => onClick("Complete")}>
        픽업완료
      </span>
    </>
  );
}

export default Dropdown;
