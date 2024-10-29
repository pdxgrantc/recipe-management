import React, { useState } from 'react'

// Utils
import { PageDisplay, PageHeader } from '../../assets/Utils'
import MyFavoriteRecipes from './MyFavoriteRecipes';


export default function FavoriteRecipes() {
    const [numFavoriteRecipes, setNumFavoriteRecipes] = useState(6);

    return (
        <div className='flex flex-col gap-2'>
            <PageHeader title='Favorite Recipes' />
            <PageDisplay>
                <MyFavoriteRecipes numRecipes={numFavoriteRecipes} />
                <button onClick={() => setNumFavoriteRecipes(numFavoriteRecipes + 6)} className='page-button text-button'>Load More</button>
            </PageDisplay>
        </div>
    );
}
