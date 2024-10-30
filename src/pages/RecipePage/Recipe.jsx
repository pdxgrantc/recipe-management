import React, { useState, useEffect } from 'react'

// Firebase
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteDoc, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

// Icons
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { MdOutlineFavorite as FavoriteIcon } from "react-icons/md";
import { MdOutlineFavoriteBorder as NotFavoriteIcon } from "react-icons/md";

// Components
import PhotoDisplay from './PhotoDisplay';

// Utils
import { PageHeader, SubTitle } from '../../assets/Utils';


export default function RecipePage({ recipe, setEditing, photoURL }) {

    const [user] = useAuthState(auth);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleEdit = () => {
        setEditing(true);
    }

    useEffect(() => {
        if (recipe && recipe.favorite !== undefined) {
            setIsFavorite(recipe.favorite === true);
        }
    }, [recipe]);

    const handleSetFavorite = async () => {
        // if the recipe is created by the logged in user
        if (recipe.createdBy === user.uid) {
            try {
                if (isFavorite === false) {
                    // Firebase reference to the recipe document to be favorited
                    const recipeRef = doc(db, 'users', user.uid, 'recipes', recipe.id);
                    // Firebase reference to the favorite document
                    const favoriteRef = doc(db, 'users', user.uid, 'favorites', recipe.id);
                    // Document that stores the reference to the favorite recipe
                    const favoriteData = {
                        recipeReference: `/users/${user.uid}/recipes/${recipe.id}`,
                        dateAdded: new Date()
                    };
                    // Add/update the favorite document in the database
                    await setDoc(favoriteRef, favoriteData);

                    // Update the recipe in the database
                    await updateDoc(recipeRef, {
                        favorite: !isFavorite
                    });
                    setIsFavorite(!isFavorite);
                } else {
                    // Firebase reference to the favorite document
                    const favoriteRef = doc(db, 'users', user.uid, 'favorites', recipe.id);
                    // Delete the favorite document from the database
                    await deleteDoc(favoriteRef);

                    // Firebase reference to the recipe document to be unfavorited
                    const recipeRef = doc(db, 'users', user.uid, 'recipes', recipe.id);
                    // Update the recipe in the database
                    await updateDoc(recipeRef, {
                        favorite: !isFavorite
                    });

                    setIsFavorite(!isFavorite);
                }
            } catch (error) {
                console.error('Error updating favorite status:', error);
            }
        }
    };

    if (!recipe) return null;

    return (
        <>
            <div className='w-fit min-w-[70rem] flex flex-col gap-2'>
                <div className='flex justify-between gap-2'>
                    <PageHeader title={recipe.title} />
                    <div className='flex gap-5 h-fit items-baseline self-center'>
                        <button name='set favorite' className='text-button page-button' onClick={handleSetFavorite}>
                            <p>Favorite</p>
                            {isFavorite ? <FavoriteIcon /> : <NotFavoriteIcon />}
                        </button>
                        <button name='toggle edit' className='text-button page-button' onClick={handleEdit}>
                            <p>Edit</p>
                            <EditIcon />
                        </button>
                    </div>
                </div>
                <div className='relative'>
                    {recipe.hasImage &&
                        <div className='absolute top-0 right-0 w-[30rem] h-[25rem]'>
                            <PhotoDisplay photoURL={photoURL} />
                        </div>
                    }
                    <div className='pr-[30rem] flex flex-col gap-2'>
                        {recipe.description !== '' && <p>{recipe.description}</p>}
                        <Ingredients ingredients={recipe.ingredients} />
                        <Steps steps={recipe.steps} />
                        {recipe.notes !== '' && <Notes notes={recipe.notes} />}
                    </div>
                </div>
            </div>
        </>
    );
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
        <p>{ingredient.amount} {ingredient?.fraction} {ingredient.unit} {ingredient.ingredient}</p>
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

function Notes({ notes }) {
    return (
        <div>
            <SubTitle text='Notes' />
            <p>{notes}</p>
        </div>
    )
}
