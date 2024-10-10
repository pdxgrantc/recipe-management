import React, { useState } from 'react'

// Firebase
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection } from 'firebase/firestore';

// Utils
import { PageDisplay, PageHeader, SubTitle } from '../../assets/Utils'

// Icons
import { MdOutlineCancel as DeleteIcon } from "react-icons/md";

export default function CreateRecipe() {
    return (
        <>
            <PageHeader title='Create Recipe' />
            <PageDisplay>
                <CreateForm />
            </PageDisplay>
        </>
    )
}

function CreateForm() {
    const [user] = useAuthState(auth);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ amount: '', unit: '', ingredient: '' }]);
    const [steps, setSteps] = useState(['']);

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

    const handleSubmit = async () => {
        // create firebase compatible date
        const date = new Date();

        const recipe = {
            dateCreated: date,
            dateUpdated: date,
            title,
            description,
            ingredients,
            steps,
            sharedGlobal: false
        }

        const recipeRef = collection(db, 'users', user.uid, 'recipes');
        await addDoc(recipeRef, recipe);
    }

    return (
        <>
            <input name="Recipe Title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea name="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
            <div>
                <button onClick={handleSubmit} className='text-button page-button'>Submit</button>
            </div>
        </>
    )
}
