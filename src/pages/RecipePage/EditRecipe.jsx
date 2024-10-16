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
import AddImageToRecipe from './AddImageToRecipe';
import EditPhotoDisplay from './EditPhotoDisplay';


export default function EditRecipe({ recipe, setEditing, handleDeletePhoto, photoURLs, fetchPhotoURLs }) {
    const [user] = useAuthState(auth);

    // get recipe id from url   
    const { id } = useParams();

    const [title, setTitle] = useState(recipe?.title);
    const [description, setDescription] = useState(recipe?.description);
    const [ingredients, setIngredients] = useState(recipe?.ingredients);
    const [steps, setSteps] = useState(recipe?.steps);
    const [notes, setNotes] = useState(recipe?.notes);

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
            notes: notes,
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

        // delete photos from firebase storage
        photoURLs.forEach(async (photo) => {
            await handleDeletePhoto(photo.id, photo.index);
        });

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
                    <div className='flex justify-between min-w-[50rem]'>
                        <input name="Recipe Title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <div className='flex gap-4'>
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
                    <textarea name="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-10 max-w-[75rem]'>
                <AddImageToRecipe fetchPhotoURLs={fetchPhotoURLs} />
                {photoURLs.length !== 0 ? <EditPhotoDisplay photoURLs={photoURLs} handleDeletePhoto={handleDeletePhoto} /> : <div></div>}
            </div>
            <div className='flex flex-col gap-5 w-fit'>
                <div className='flex flex-col gap-2'>
                    <SubTitle text='Ingredients' />
                    {ingredients.length !== 0 &&
                        <ul className='flex flex-col gap-2'>
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className='flex items-center gap-2 flex-nowrap'>
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
                                        <option value="lb">Lb</option>
                                        <option value='oz'>L</option>
                                        <option value="g">G</option>
                                        <option value="kg">Kg</option>
                                        <option value='ml'>Ml</option>
                                        <option value='oz'>L</option>
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
                <div className='flex flex-col gap-2 w-full'>
                    <SubTitle text='Instructions' />
                    {steps.length !== 0 &&
                        <ul className='flex flex-col gap-2'>
                            {steps.map((step, index) => (
                                <li key={index} className='flex items-center gap-2 justify-between'>
                                    <input className='w-full' name="Step Text" type="text" value={step} onChange={(e) => {
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
            </div>
            <div>
                <SubTitle text='Notes' />
                <textarea name="Notes" placeholder="Notes" className='h-fit w-60' value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
        </>
    )
}
