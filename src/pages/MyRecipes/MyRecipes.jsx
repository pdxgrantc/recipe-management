import React from 'react'

// Utils
import { PageDisplay, PageHeader } from '../../assets/Utils'
import MyRecentRecipes from '../../assets/MyRecentRecipes';

export default function MyRecipe() {
    return (
        <>
            <PageHeader title='Recipes' />
            <PageDisplay>
                <MyRecentRecipes recipes={10} />
            </PageDisplay>
        </>
    );
}
