import React, { useState, useEffect } from 'react'

// Utils
import { PageDisplay, PageHeader } from '../../assets/Utils'

// Firebase
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';


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

    const handleAddStep = () => {
        setSteps([...steps, '']);
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
            steps
        }

        const recipeRef = await addDoc(collection(db, 'users', user.uid, 'recipes'), recipe);
    }

    return (
        <>
            <input name="Recipe Title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea name="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div>
                <h3>Ingredients</h3>
                <button onClick={handleAddIngredient}>Add Ingredient</button>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
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
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Instructions</h3>
                <button onClick={handleAddStep}>Add Step</button>
                <ul>
                    {steps.map((step, index) => (
                        <li key={index}>
                            <input name="Step Text" type="text" value={step} onChange={(e) => {
                                const newSteps = [...steps];
                                newSteps[index] = e.target.value;
                                setSteps(newSteps);
                            }} />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </>
    )
}

