import React, { useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if it's a CSV file
      if (!file.name.endsWith('.csv')) {
        alert('Please select a CSV file');
        return;
      }
      onFileUpload(file);
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button type="button" className="upload-btn" onClick={handleClick}>
        Choose CSV File
      </button>
      <p className="file-info">
        Please upload a CSV file with transaction data
      </p>
    </div>
  );
};

export default FileUpload;
