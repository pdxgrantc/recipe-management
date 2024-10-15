import React from 'react'
import { Link } from 'react-router-dom';

// Utils
import { SubTitle } from './Utils';

export default function RecipeThumbnail({ recipe }) {
    return (
        <Link className='block overflow-hidden' to={"/recipe/my/" + recipe.id}>
            <SubTitle text={recipe.title} classes={"truncate whitespace-nowrap overflow-hidden"} />
            {recipe.thumbnail ? (
                <img className="rounded w-full h-full object-cover" src={recipe.thumbnail} alt={recipe.title} />
            ) : (
                <p>{recipe.description}</p>
            )}
        </Link>
    )
}
