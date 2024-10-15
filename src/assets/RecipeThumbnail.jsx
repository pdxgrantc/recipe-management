import React from 'react';
import { Link } from 'react-router-dom';

// Utils
import { SubTitle } from './Utils';

export default function RecipeThumbnail({ recipe }) {
    return (
        <Link className='overflow-hidden flex flex-col gap-1' to={"/recipe/my/" + recipe.id}>
            <SubTitle text={recipe.title} classes={"truncate whitespace-nowrap overflow-hidden"} />
            <div className="aspect-w-4 aspect-h-3 rounded overflow-hidden">
                {recipe.thumbnail ? (
                    <img className="w-full h-full object-cover" src={recipe.thumbnail} alt={recipe.title} />
                ) : (
                    <p className='description line-clamp-5'>{recipe.description}</p>
                )}
            </div>
        </Link>
    );
}
