import React, { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom';

// Firebase
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

// Icons
import { FaRegSave as SaveIcon } from "react-icons/fa";
import { MdOutlineDeleteOutline as DeleteIcon } from "react-icons/md";
import { MdOutlineCancel as CancelIcon } from "react-icons/md";

// Utils
import { SwitchButton, SubTitle } from '../../assets/Utils';
import FileUpload from '../../assets/FileUpload';


export default function EditRecipe({ recipe, setEditing }) {
    const [user] = useAuthState(auth);

    // get recipe id from url   
    const { id } = useParams();

    const [title, setTitle] = useState(recipe?.title);
    const [description, setDescription] = useState(recipe?.description);
    const [ingredients, setIngredients] = useState(recipe?.ingredients);
    const [steps, setSteps] = useState(recipe?.steps);

    const [goToMyRecipes, setGoToMyRecipes] = useState(false);

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

    const handleCancel = () => {
        // exit edit mode
        setEditing(false);
    }

    const handleDelete = async () => {
        // delete recipe from firebase
        const recipeRef = doc(db, 'users', user.uid, 'recipes', id);
        await deleteDoc(recipeRef);

        // redirect to my recipes
        setGoToMyRecipes(true);
    }

    if (goToMyRecipes) {
        return <Navigate to='/my-recipes' />
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
                    <button name='Cancel' className='text-button page-button' onClick={handleCancel}>
                        <p>Cancel</p>
                        <CancelIcon />
                    </button>
                    <button name='delete recipe' className='text-button page-button' onClick={handleDelete}>
                        <p>Delete</p>
                        <DeleteIcon />
                    </button>
                    <button name='toggle edit' className='text-button page-button' onClick={handleEdit}>
                        <p>Save</p>
                        <SaveIcon />
                    </button>
                </div>
            </div>
            <FileUpload />
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
                                <select
                                    name="Ingredient Measurement Type"
                                    value={ingredient.unit}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].unit = e.target.value;
                                        setIngredients(newIngredients);
                                    }}
                                >
                                    <option value="cup">Cup</option>
                                    <option value="tbsp">Tbsp</option>
                                    <option value="tsp">Tsp</option>
                                    <option value="fluid oz">Fluid oz</option>
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
