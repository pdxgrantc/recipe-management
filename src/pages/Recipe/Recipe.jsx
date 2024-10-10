import React from 'react'

// Firebase
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// Icons
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";

// Utils
import { PageHeader, SubTitle } from '../../assets/Utils';


export default function Recipe({ recipe, setEditing }) {
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
                <p>{recipe.description}</p>
            </div>
            <Ingredients ingredients={recipe.ingredients} />
            <Steps steps={recipe.steps} />
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