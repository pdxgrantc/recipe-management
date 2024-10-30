import React, { useState } from 'react'

// Icons
import { MdOutlineDeleteOutline as DeleteIcon } from "react-icons/md";


export default function EditPhotoDisplay({ handleDeletePhoto, photoURL }) {
    return (
        <div className='w-fit flex flex-col gap-2'>
            <div className='w-[30rem] h-[25rem] flex items-center justify-center rounded overflow-hidden'>
                <img src={photoURL?.url} alt='recipe' className='h-auto max-h-full object-contain rounded' />
            </div>
            <div className='flex justify-between items-center gap-2 w-[15rem] mx-auto'>
                <button onClick={() => handleDeletePhoto(photoURL.id, currentIndex)} className="page-button text-button">
                    <DeleteIcon className='w-10 h-auto page-button' />
                </button>
            </div>
        </div>
    );
}
