import { useState } from "react";

const InputStoreInformationflie = ({ title, id, requiredname, onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState(false);
  if (fileSizeError) {
    console.log("파일크기 에러");
  }
  const InputFilesss = () => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (file && file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
        onChange(file);
        setFileSizeError(false);
      } else {
        setFileSizeError(true);
        setSelectedFile(null);
        onChange(null);
      }
    };

    return (
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    );
  };

  return (
    <div className="signup-page-content-store-wrapper">
      <label className="signup-page-content-store-label-style">{title}</label>
      <div>
        <InputFilesss />
        <input
          id={id}
          type="text"
          placeholder="파일을 마우스로 끌어오세요"
          defaultValue={selectedFile ? selectedFile.name : ""}
          readOnly
          onClick={() => {
            const inputFile = document.getElementById(id);
            if (inputFile) {
              inputFile.click();
            }
          }}
          className="signup-page-content-store-input"
        />
      </div>
    </div>
  );
};

export default InputStoreInformationflie;
