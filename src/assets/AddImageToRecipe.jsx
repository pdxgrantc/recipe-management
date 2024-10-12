import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

// Firebase
import { auth, storage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, uploadBytesResumable } from 'firebase/storage';

// Utils
import { v4 as uuidv4 } from 'uuid';

// Icons
import { MdOutlineCancel as CancelIcon } from "react-icons/md";

export default function AddImageToRecipe() {
  const [user] = useAuthState(auth);

  // get the id of the recipe from the url
  const recipeID = useParams().id;

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setErrorMessage('Only image files are allowed.');
      return;
    }
    setFile(acceptedFiles[0]);
    setErrorMessage('');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Only accept image files
  });

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    setShowUploadProgress(true);

    const randomName = uuidv4(); // Generate a random name
    const storageRef = ref(storage, `users/${user.uid}/recipes/${recipeID}/${randomName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      () => {
        console.log('File uploaded successfully!');
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className="border-4 border-dashed border-gray-400 p-6 text-center cursor-pointer w-64 rounded"
      >
        <input {...getInputProps()} />
        <p>Drag and drop an image file here, or click to select a file</p>
      </div>
      {errorMessage && (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      )}
      {file && (
        <div className="w-full flex flex-col gap-2">
          <div className='flex gap-2'>
            <p>Selected file: {file.name}</p>
            <button onClick={() => setFile(null)} className="icon-button"><CancelIcon /></button>
          </div>
          <button
            onClick={handleUpload}
            className="page-button text-button"
          >
            Upload
          </button>
          {showUploadProgress && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          <p>{uploadProgress.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};
