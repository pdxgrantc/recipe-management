import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Firebase
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

// UtilsDF
import { PageDisplay, PageHeader, SubTitle, TableHeader } from '../../assets/Utils'

export default function MyRecipe() {
    const [user] = useAuthState(auth);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (user) {
            const recipesRef = collection(db, 'users', user.uid, 'recipes');
            const recipesQuery = query(recipesRef, orderBy('dateUpdated', 'desc'), limit(10));
    
            const unsubscribe = onSnapshot(recipesQuery, (snapshot) => {
                const recipesList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecipes(recipesList);
            });
    
            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, [user]);

    console.log(recipes);
    

    return (
        <>
            <PageHeader title='Recipes' />
            <PageDisplay>
                <Recipes recipes={recipes} />
            </PageDisplay>
        </>
    );
}

function Recipes({ recipes }) {
    // check if recipes is defined
    if (!recipes) return null;

    return (
        <div>
            {recipes.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} index={index} />
            ))}
        </div>
    )
}

function Recipe({ recipe, index }) {
    return (
        <Link to={"/recipe/my/" + recipe.id}>
            <p>{index}</p>
            <SubTitle text={recipe.title} />
            <p>{recipe.description}</p>
            <Ingredients ingredients={recipe.ingredients} />
            <Steps steps={recipe.steps} />
        </Link>
    )
}

function Ingredients({ ingredients }) {
    return (
        <div>
            <TableHeader text='Ingredients' />
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
            <TableHeader text='Steps' />
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
