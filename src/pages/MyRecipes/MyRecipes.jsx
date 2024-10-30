import React, { useEffect, useState } from 'react'

// Firebase
import { auth, db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';

// Utils
import { PageDisplay, PageHeader } from '../../assets/Utils'
import MyRecentRecipes from '../../assets/MyRecentRecipes';


export default function MyRecipe() {
    const [numRecentRecipes, setNumRecentRecipes] = useState(6);3
    const [numTotalRecipes, setNumTotalRecipes] = useState(0);

    // get total number of recipes
    useEffect(() => {
        const getNumRecipes = async () => {
            const recipesRef = collection(db, `users/${auth.currentUser.uid}/recipes`);
            const recipesSnapshot = await getDocs(recipesRef);
            setNumTotalRecipes(recipesSnapshot.size);
        }
        getNumRecipes();
    }, [])
    
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
