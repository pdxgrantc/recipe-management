import React from 'react';
import { Link } from 'react-router-dom';

// Utils
import { SubTitle, TableHeader } from './Utils';


export default function MyRecipeList({ recipes }) {
    // check if recipes is defined
    if (!recipes) return null;

    return (
        <div>
            {recipes.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} />
            ))}
        </div>
    )
}

function Recipe({ recipe }) {
    return (
        <Link to={"/recipe/my/" + recipe.id}>
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
