import React, { useState, useEffect } from 'react'

// Firebase
import { auth, db, storage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

// Utils
import MyRecipeList from './MyRecipeList';


export default function MyRecentRecipes({ numRecipes }) {
    const [user] = useAuthState(auth);
    const [recipes, setRecipes] = useState([]);
    const [recipesWithThumbnails, setRecipesWithThumbnails] = useState([]);

    // Fetch input number of recipes from Firestore
    useEffect(() => {
        if (user) {
            const recipesRef = collection(db, 'users', user.uid, 'recipes');
            const recipesQuery = query(recipesRef, orderBy('dateUpdated', 'desc'), limit(numRecipes));

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
    }, [user, numRecipes]);

    // Fetch the thumbnails of the recipes
    useEffect(() => {
        const fetchThumbnails = async () => {
            const updatedRecipes = await Promise.all(recipes.map(async (recipe) => {
                try {
                    const imagesRef = ref(storage, `users/${user.uid}/recipes/${recipe.id}`);
                    const result = await listAll(imagesRef);
                    if (result.items.length > 0) {
                        const imageUrl = await getDownloadURL(result.items[0]);
                        return { ...recipe, thumbnail: imageUrl };
                    }
                    return recipe;
                } catch (error) {
                    console.error('Error fetching image URL:', error);
                    return recipe;
                }
            }));
            setRecipesWithThumbnails(updatedRecipes);
        };

        if (recipes.length > 0) {
            fetchThumbnails();
        }
    }, [recipes, user]);

    return (
        <MyRecipeList recipes={recipesWithThumbnails} />
    );
}
