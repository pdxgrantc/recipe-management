import React from 'react'
import { Link } from 'react-router-dom';

// Utils
import { SubTitle } from './Utils';

export default function RecipeThumbnail({ recipe }) {
    return (
        <Link to={"/recipe/my/" + recipe.id}>
            <SubTitle text={recipe.title} />
            {recipe.thumbnail ? <img src={recipe.thumbnail} alt={recipe.title} /> : <p>{recipe.description}</p>}
        </Link>
    )
}
