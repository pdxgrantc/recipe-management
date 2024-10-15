import React from 'react';
import { Link } from 'react-router-dom';

import RecipeThumbnail from './RecipeThumbnail';


export default function MyRecipeList({ recipes }) {
    // check if recipes is defined
    if (!recipes) return null;

    return (
        <div className='grid grid-cols-3'>
            {recipes.map((recipe, index) => (
                <div>
                    <RecipeThumbnail key={index} recipe={recipe} />
                </div>
            ))}
        </div>
    )
}
