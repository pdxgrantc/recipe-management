import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

function FileUpload() {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `files/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      {file && (
        <div>
          <p>Selected file: {file.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;