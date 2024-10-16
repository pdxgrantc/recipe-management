import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

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
            <PageDisplay classes='w-fit'>
                <CreateForm />
            </PageDisplay>
        </>
    )
}

function CreateForm() {
    const [user] = useAuthState(auth);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ amount: '', fraction: '', unit: '', ingredient: '' }]);
    const [steps, setSteps] = useState(['']);
    const [notes, setNotes] = useState('');

    const [goToNeNewRecipe, setGoToNewRecipe] = useState([false, '']);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { amount: '', fraction: '', unit: '', ingredient: '' }]);
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
            notes,
            sharedGlobal: false
        }

        const recipeRef = collection(db, 'users', user.uid, 'recipes');
        const docRef = await addDoc(recipeRef, recipe);
        const recipeId = docRef.id;

        setGoToNewRecipe([true, ("/recipe/my/" + recipeId)]);
    }

    if (goToNeNewRecipe[0]) {
        return <Navigate to={goToNeNewRecipe[1]} />
    }

    return (
        <>
            <input name="Recipe Title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea name="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className='flex flex-col gap-2'>
                <SubTitle text='Ingredients' />
                {ingredients.length !== 0 &&
                    <ul className='flex flex-col gap-2'>
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <input
                                    name="Ingredient Amount"
                                    type="number"
                                    placeholder="Amount"
                                    value={ingredient.amount}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].amount = e.target.value;
                                        setIngredients(newIngredients);
                                    }}
                                />
                                <select
                                    name="Ingredient Fraction"
                                    value={ingredient.fraction}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].fraction = e.target.value;
                                        setIngredients(newIngredients);
                                    }}
                                >
                                    <option value=''> </option>
                                    <option value='1/8'>1/8</option>
                                    <option value='1/4'>1/4</option>
                                    <option value='1/3'>1/3</option>
                                    <option value='3/8'>3/8</option>
                                    <option value='1/2'>1/2</option>
                                    <option value='5/8'>5/8</option>
                                    <option value='2/3'>2/3</option>
                                    <option value='3/4'>3/4</option>
                                    <option value='7/8'>7/8</option>
                                </select>
                                <select
                                    name="Ingredient Measurement Type"
                                    value={ingredient.measurementType}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].unit = e.target.value;
                                        setIngredients(newIngredients);
                                    }}
                                >
                                    <option value=''> </option>
                                    <option value="cup">Cup</option>
                                    <option value="tbsp">Tbsp</option>
                                    <option value="tsp">Tsp</option>
                                    <option value="fluid oz">Fluid oz</option>
                                    <option value="lb">Lb</option>
                                    <option value="oz">Oz</option>
                                    <option value="g">G</option>
                                    <option value="kg">Kg</option>
                                    <option value="ml">Ml</option>
                                    <option value="l">L</option>
                                </select>
                                <input
                                    name="Ingredient Name"
                                    type="text"
                                    placeholder="Ingredient"
                                    value={ingredient.ingredient}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].ingredient = e.target.value;
                                        setIngredients(newIngredients);
                                    }}
                                />
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
            <div>
                <SubTitle text='Notes' />
                <input className='w-full h-fit min-h-40' name="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div>
                <button onClick={handleSubmit} className='text-button page-button'>Submit</button>
            </div>
        </>
    )
}
