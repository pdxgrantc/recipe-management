import React, { useState } from 'react'

// Icons
import { LuChevronLeftCircle as PreviousIcon } from "react-icons/lu";
import { LuChevronRightCircle as NextIcon } from "react-icons/lu";


export default function EditPhotoDisplay({ photoURLs }) {
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

    return (
        <div className='w-fit flex flex-col gap-2'>
            <div className='w-[30rem] h-[25rem] flex items-center justify-center rounded overflow-hidden'>
                <img src={photoURLs[currentIndex]} alt='recipe' className='w-full h-auto max-h-full object-contain rounded' />
            </div>
            <div className='flex justify-between items-center gap-2 w-[13rem] mx-auto'>
                <button onClick={handlePrev}>
                    <PreviousIcon className='w-10 h-auto page-button' />
                </button>
                <div>
                    <p>{currentIndex + 1}/{photoURLs.length}</p>
                </div>
                <button onClick={handleNext}>
                    <NextIcon className='w-10 h-auto page-button' />
                </button>
            </div>
        </div>
    );
}