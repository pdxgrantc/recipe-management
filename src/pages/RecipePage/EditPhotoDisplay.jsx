import React, { useState } from 'react'

// Icons
import { LuChevronLeftCircle as PreviousIcon } from "react-icons/lu";
import { LuChevronRightCircle as NextIcon } from "react-icons/lu";
import { MdOutlineDeleteOutline as DeleteIcon } from "react-icons/md";


export default function EditPhotoDisplay({ handleDeletePhoto, photoURLs }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < photoURLs.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(photoURLs.length - 1);
        }
    }

    const handleDelete = () => {
        // delete the photo from storage
        // delete the photo from the array

        const newPhotoURLs = [...photoURLs];
        newPhotoURLs.splice(currentIndex, 1);
        setPhotoURLs(newPhotoURLs);
    }

    console.log('photoURLs:', photoURLs);

    return (
        <div className='w-fit flex flex-col gap-2'>
            <div className='w-[30rem] h-[25rem] flex items-center justify-center rounded overflow-hidden'>
                <img src={photoURLs[currentIndex]?.url} alt='recipe' className='h-auto max-h-full object-contain rounded' />
            </div>
            <div className='flex justify-between items-center gap-2 w-[15rem] mx-auto'>
                <button onClick={handlePrev}>
                    <PreviousIcon className='w-10 h-auto page-button' />
                </button>
                <div>
                    <p>{currentIndex + 1}/{photoURLs.length}</p>
                </div>
                <button onClick={handleNext}>
                    <NextIcon className='w-10 h-auto page-button' />
                </button>
                <button onClick={() => handleDeletePhoto(photoURLs[currentIndex].id, currentIndex)} className="page-button text-button">
                    <DeleteIcon className='w-10 h-auto page-button' />
                </button>
            </div>
        </div>
    );
}
