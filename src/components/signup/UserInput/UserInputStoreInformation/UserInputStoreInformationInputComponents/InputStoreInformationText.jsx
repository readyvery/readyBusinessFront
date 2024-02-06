const InputStoreInformationText = ({
  title,
  id,
  placeholder,
  requiredname,
  onChange,
}) => {
  return (
    <div className="signup-page-content-store-wrapper">
      <label className="signup-page-content-store-label-style">{title}</label>
      <div>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          required
          name={requiredname}
          className="signup-page-content-store-input"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputStoreInformationText;
