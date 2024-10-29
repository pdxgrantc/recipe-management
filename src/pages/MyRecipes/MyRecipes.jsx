import React, { useEffect, useState } from 'react'

// Firebase
import { auth, db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';

// Utils
import { PageDisplay, PageHeader } from '../../assets/Utils'
import MyRecentRecipes from '../../assets/MyRecentRecipes';


export default function MyRecipe({numTotalRecipes}) {
    const [numRecentRecipes, setNumRecentRecipes] = useState(6);
    
    return (
        <div className='flex flex-col gap-2'>
            <PageHeader title='Your Recipes' />
            <PageDisplay>
                <MyRecentRecipes numRecipes={numRecentRecipes} />
                {numRecentRecipes < numTotalRecipes && <button onClick={() => setNumRecentRecipes(numRecentRecipes + 6)} className='page-button text-button'>Load More</button>}
            </PageDisplay>
        </div>
    );
}
