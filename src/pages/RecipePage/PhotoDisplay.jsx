import React, { useState } from 'react'

export default function PhotoDisplay({ photoURL }) {
    return (
        <div className='w-fit flex flex-col gap-2'>
            <div className='w-[30rem] h-[25rem] flex items-center justify-center'>
                <img src={photoURL?.url} alt='recipe' className='rounded w-auto h-full' />
            </div>
        </div>
    )
}
