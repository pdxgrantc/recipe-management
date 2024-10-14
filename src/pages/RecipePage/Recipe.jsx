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
    const [user] = useAuthState(auth);

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
                {(recipe.description === '' || photoURLs.length === 0) ?
                    <>
                        {recipe.description !== '' && <p>{recipe.description}</p>}
                        {photoURLs.length !== 0 && <PhotoDisplay photoURLs={photoURLs} />}
                    </>
                    :
                    <div className='grid grid-cols-2'>
                        <p>{recipe.description}</p>
                        <PhotoDisplay photoURLs={photoURLs} />
                    </div>
                }
            </div >
            <Ingredients ingredients={recipe.ingredients} />
            <Steps steps={recipe.steps} />
            {recipe.notes !== '' && <Notes notes={recipe.notes} />}
        </>
    )
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
        <p>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</p>
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
