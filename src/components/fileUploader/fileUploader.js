import React, { useRef } from "react";

import "./fileUploader.css";

const FileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    // handle validations
    const file = URL.createObjectURL(e.target.files[0]);
    const file2 = e.target.files[0]
    if (file.size > 1024) onFileSelectSuccess(file, file2);
    else onFileSelectSuccess(file, file2);
  };

  return (
    <div className="browseButton">
      <label htmlFor="upload-photo">Choose photo</label>
      <input type="file" onChange={handleFileInput} accept="image/png" id="upload-photo" />
    </div>
  );
};

export default FileUploader;
