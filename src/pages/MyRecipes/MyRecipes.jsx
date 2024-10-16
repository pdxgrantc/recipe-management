import React from 'react'

// Utils
import { PageDisplay, PageHeader } from '../../assets/Utils'
import MyRecentRecipes from '../../assets/MyRecentRecipes';


export default function MyRecipe() {
    return (
        <div className='flex flex-col gap-2'>
            <PageHeader title='Recipes' />
            <PageDisplay>
                <MyRecentRecipes recipes={10} />
            </PageDisplay>
        </div>
    );
}
