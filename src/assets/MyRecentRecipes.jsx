import React, { useState, useEffect } from 'react'

// Firebase
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

// Utils
import MyRecipeList from './MyRecipeList';


export default function MyRecentRecipes({ numRecipes }) {
    const [user] = useAuthState(auth);
    const [recipes, setRecipes] = useState([]);

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
    }, [user]);

    return (
        <MyRecipeList recipes={recipes} />
    );

}