import React, { useState } from 'react';
import 'src/component/clients/DocumentUpload.css';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    alert(`Uploaded: ${file?.name}`);
  };

  return (
    <div className="document-upload">
      <h3>Upload PAN, GST, IT Return</h3>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default DocumentUpload;
