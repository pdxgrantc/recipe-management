import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

// Firebase
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

// Icons
import { FaRegSave as SaveIcon } from "react-icons/fa";
import { MdOutlineDeleteOutline as DeleteIcon } from "react-icons/md";
import { MdOutlineCancel as CancelIcon } from "react-icons/md";

// Utils
import { SwitchButton, SubTitle } from '../../assets/Utils';


export default function EditRecipe({ recipe, setEditing }) {
    const [user] = useAuthState(auth);

    // get recipe id from url   
    const { id } = useParams();

    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [steps, setSteps] = useState(recipe.steps);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { amount: '', unit: '', ingredient: '' }]);
    }

    const handleDeleteIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients
        );
    }

    const handleAddStep = () => {
        setSteps([...steps, '']);
    }

    const handleDeleteStep = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    }

    const handleUpdateRecipe = async () => {
        // create firebase compatible date
        const date = new Date();

        const updatedRecipe = {
            dateCreated: recipe.dateCreated,
            dateUpdated: date,
            title: title,
            description: description,
            ingredients: ingredients,
            steps: steps,
            sharedGlobal: recipe.sharedGlobal
        }

        console.log(updatedRecipe);

        // add recipe to firebase
        const recipeRef = doc(db, 'users', user.uid, 'recipes', id);
        await setDoc(recipeRef, updatedRecipe);

    }

    const handleEdit = () => {
        // update recipe in firebase
        handleUpdateRecipe();
        // exit edit mode
        setEditing(false);
    }

    return (
        <>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-2'>
                    <input name="Recipe Title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea name="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <SwitchButton text='Share' onClick={() => { }} />
                    <button name='Cancel' className='text-button page-button'>
                        <p>Cancel</p>
                        <CancelIcon />
                    </button>
                    <button name='delete recipe' className='text-button page-button'>
                        <p>Delete</p>
                        <DeleteIcon />
                    </button>
                    <button name='toggle edit' className='text-button page-button' onClick={handleEdit}>
                        <p>Save</p>
                        <SaveIcon />
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <SubTitle text='Ingredients' />
                {ingredients.length !== 0 &&
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <input name="Ingredient Amount" type="number" placeholder="Amount" value={ingredient.amount} onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].amount = e.target.value;
                                    setIngredients(newIngredients);
                                }} />
                                <select name="Ingredient Measurement Type">
                                    <option value="unit">Unit</option>
                                    <option value="cup">Cup</option>
                                    <option value="tbsp">Tbsp</option>
                                    <option value="tsp">Tsp</option>
                                    <option value="fluid-oz">Fluid oz</option>
                                    <option value="g">G</option>
                                    <option value="kg">Kg</option>
                                    <option value="lb">Lb</option>
                                    <option value='ml'>Ml</option>
                                </select>
                                <input name="Ingredient Name" type="text" placeholder="Ingredient" value={ingredient.ingredient} onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].ingredient = e.target.value;
                                    setIngredients(newIngredients);
                                }} />
                                <button className='icon-button'>
                                    <DeleteIcon className='w-8 h-8' onClick={() => handleDeleteIngredient(index)} />
                                </button>
                            </li>
                        ))}
                    </ul>
                }
                <button onClick={handleAddIngredient} className='text-button page-button'>Add Ingredient</button>
            </div>
            <div className='flex flex-col gap-2'>
                <SubTitle text='Instructions' />
                {steps.length !== 0 &&
                    <ul>
                        {steps.map((step, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <input name="Step Text" type="text" value={step} onChange={(e) => {
                                    const newSteps = [...steps];
                                    newSteps[index] = e.target.value;
                                    setSteps(newSteps);
                                }} />
                                <button className='icon-button'>
                                    <DeleteIcon className='w-8 h-8' onClick={() => handleDeleteStep(index)} />
                                </button>
                            </li>
                        ))}
                    </ul>
                }
                <button onClick={handleAddStep} className='text-button page-button'>Add Step</button>
            </div>
        </>
    )
}





/*
return (
        <div>
            {recipe && (
                <div>
                    <div className='flex justify-between gap-2'>
                        <h1>{recipe.title}</h1>
                        <div className='flex gap-5'>
                            <SwitchButton text='Share' onClick={() => { }} />
                            <button name='Cancel' className='text-button page-button'>
                                <p>Cancel</p>
                                <CancelIcon />
                            </button>
                            <button name='delete recipe' className='text-button page-button'>
                                <p>Delete</p>
                                <DeleteIcon />
                            </button>
                            <button name='toggle edit' className='text-button page-button' onClick={handleEdit}>
                                <p>Save</p>
                                <SaveIcon />
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
*/

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
