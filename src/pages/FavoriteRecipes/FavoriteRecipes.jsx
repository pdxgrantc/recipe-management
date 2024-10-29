import React, { useEffect, useState } from 'react'

// Firebase
import { auth, db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';

// Utils
import { PageDisplay, PageHeader } from '../../assets/Utils'
import MyFavoriteRecipes from './MyFavoriteRecipes';


export default function FavoriteRecipes() {
    const [numFavoritesShown, setNumFavoritesShown] = useState(6);
    const [numTotalFavorites, setNumTotalFavorites] = useState(0);

    // get total number of recipes
    useEffect(() => {
        const getNumRecipes = async () => {
            const recipesRef = collection(db, `users/${auth.currentUser.uid}/favorites`);
            const recipesSnapshot = await getDocs(recipesRef);
            setNumTotalFavorites(recipesSnapshot.size);
        }
        getNumRecipes();
    }, [])

    return (
        <div className='flex flex-col gap-2'>
            <PageHeader title='Favorite Recipes' />
            <PageDisplay>
                <MyFavoriteRecipes numRecipes={numFavoritesShown} />
                {numFavoritesShown < numTotalFavorites && <button onClick={() => setNumFavoritesShown(numFavoritesShown + 6)} className='page-button text-button'>Load More</button>}
            </PageDisplay>
        </div>
    );
}
