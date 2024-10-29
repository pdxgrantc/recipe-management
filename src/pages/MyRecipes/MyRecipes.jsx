import React, { useState } from 'react'

// Utils
import { PageDisplay, PageHeader } from '../../assets/Utils'
import MyRecentRecipes from '../../assets/MyRecentRecipes';


export default function MyRecipe() {
    const [numRecentRecipes, setNumRecentRecipes] = useState(6);
    
    return (
        <div className='flex flex-col gap-2'>
            <PageHeader title='Your Recipes' />
            <PageDisplay>
                <MyRecentRecipes numRecipes={numRecentRecipes} />
                <button onClick={() => setNumRecentRecipes(numRecentRecipes + 6)} className='page-button text-button'>Load More</button>
            </PageDisplay>
        </div>
    );
}
