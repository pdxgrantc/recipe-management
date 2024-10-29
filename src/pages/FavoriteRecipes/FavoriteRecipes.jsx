import React, { useEffect, useState } from 'react'

// Firebase
import { auth, db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';

// Utils
import { PageDisplay, PageHeader } from '../../assets/Utils'
import MyFavoriteRecipes from './MyFavoriteRecipes';


export default function FavoriteRecipes({ numTotalFavorites }) {
    const [numFavoriteRecipes, setNumFavoriteRecipes] = useState(6);

    return (
        <div className='flex flex-col gap-2'>
            <PageHeader title='Favorite Recipes' />
            <PageDisplay>
                <MyFavoriteRecipes numRecipes={numFavoriteRecipes} />
                {numFavoriteRecipes < numTotalFavorites && <button onClick={() => setNumRecentRecipes(numRecentRecipes + 6)} className='page-button text-button'>Load More</button>}
                <button onClick={() => setNumFavoriteRecipes(numFavoriteRecipes + 6)} className='page-button text-button'>Load More</button>
            </PageDisplay>
        </div>
    );
}
