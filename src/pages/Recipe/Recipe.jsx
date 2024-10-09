import React from 'react'
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";



export default function ({ recipe }) {
    const [edit, setEdit] = React.useState(false);

    return (
        <div>
            {recipe && (
                <div>
                    <div className='flex justify-between gap-2'>
                        <h1>{recipe.title}</h1>
                        <div className='flex gap-5'>
                            <button name='toggle edit' className='text-button page-button'>
                                <p>Edit</p>
                                <EditIcon />
                            </button>
                            <button name='delete recipe' className='text-button page-button'>
                                <p>Delete</p>
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                    <p>{recipe.description}</p>
                    <Ingredients ingredients={recipe.ingredients} />
                    <Steps steps={recipe.steps} />
                </div>
            )}
        </div>
    )
}

function Steps({ steps }) {
    return (
        <div>
            <h2>Steps</h2>
            {steps.map((step, index) => (
                <Step key={index} step={step} />
            ))}
        </div>
    )
}

function Step({ step }) {
    return (
        <p>{step}</p>
    )
}

function Ingredients({ ingredients }) {
    return (
        <div>
            <h2>Ingredients</h2>
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
