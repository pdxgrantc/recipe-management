import React from 'react'

// Firebase
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// Icons
import { FaRegEdit as EditIcon } from "react-icons/fa";

// Components
import PhotoDisplay from './PhotoDisplay';

// Utils
import { PageHeader, SubTitle } from '../../assets/Utils';


export default function RecipePage({ recipe, setEditing, photoURLs }) {
    const handleEdit = () => {
        setEditing(true);
    }

    if (!recipe) return null;

    return (
        <>
            <div>
                <div className='flex justify-between gap-2'>
                    <PageHeader title={recipe.title} />
                    <div className='flex gap-5 h-fit items-baseline self-center'>
                        <button name='toggle edit' className='text-button page-button' onClick={handleEdit}>
                            <p>Edit</p>
                            <EditIcon />
                        </button>
                    </div>
                </div>
                <div className='relative'>
                    {photoURLs.length > 0 &&
                        <div className='absolute top-0 right-0 w-[30rem] h-[25rem]'>
                            <PhotoDisplay photoURLs={photoURLs} />
                        </div>
                    }
                    <div className='pr-[30rem]'>
                        {recipe.description !== '' && <p>{recipe.description}</p>}
                        <Ingredients ingredients={recipe.ingredients} />
                        <Steps steps={recipe.steps} />
                        {recipe.notes !== '' && <Notes notes={recipe.notes} />}
                    </div>
                </div>
            </div>
        </>
    );
}

function Ingredients({ ingredients }) {
    return (
        <div>
            <SubTitle text='Ingredients' />
            {ingredients.map((ingredient, index) => (
                <Ingredient key={index} ingredient={ingredient} />
            ))}
        </div>
    )
}

function Ingredient({ ingredient }) {
    return (
        <p>{ingredient.amount} {ingredient?.fraction} {ingredient.unit} {ingredient.ingredient}</p>
    )
}

function Steps({ steps }) {
    return (
        <div>
            <SubTitle text='Steps' />
            {steps.map((step, index) => (
                <Step key={index} step={step} number={index + 1} />
            ))}
        </div>
    )
}

function Step({ step, number }) {
    return (
        <p>{number}. {step}</p>
    )
}

function Notes({ notes }) {
    return (
        <div>
            <SubTitle text='Notes' />
            <p>{notes}</p>
        </div>
    )
}
