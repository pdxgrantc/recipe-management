import React, { useEffect, useState } from 'react'

// Firebase
import { auth, db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';

// Components
import MyRecentRecipes from '../../assets/MyRecentRecipes';
import MyFavoriteRecipes from '../FavoriteRecipes/MyFavoriteRecipes';

// Utils
import { PageDisplay, PageHelmet, SubTitle } from '../../assets/Utils';
import { Link } from 'react-router-dom';


export default function Dashboard() {
    const [numTotalRecipes, setNumTotalRecipes] = useState(0);
    const [numTotalFavorites, setNumTotalFavorites] = useState(0);

    // get total number of recipes
    useEffect(() => {
        const getNumRecipes = async () => {
            const recipesRef = collection(db, `users/${auth.currentUser.uid}/recipes`);
            const recipesSnapshot = await getDocs(recipesRef);
            setNumTotalRecipes(recipesSnapshot.size);
        }
        getNumRecipes();
    }, [])

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
        <>
            <PageHelmet title={"Dashboard"} />
            <PageDisplay>
                {numTotalFavorites !== 0 &&
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-5 justify-between'>
                            <SubTitle text='Your Favorite Recipes' />
                            <Link to='/favorite-recipes' className='page-button text-button'>View All</Link>
                        </div>
                        <MyFavoriteRecipes numRecipes={6} numTotalFavorites={numTotalFavorites} />
                    </div>
                }
                {numTotalRecipes !== 0 &&
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-5 justify-between'>
                            <SubTitle text='Your Recently Updated Recipes ' />
                            <Link to='/my-recipes' className='page-button text-button'>View All</Link>
                        </div>
                        <MyRecentRecipes numRecipes={6} numTotalRecipes={numTotalRecipes} />
                    </div>
                }
            </PageDisplay>
        </>
    )
}
