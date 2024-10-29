import React, { useState, useEffect } from 'react'

// Firebase
import { auth, db, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, orderBy, limit, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

// Utils
import MyRecipeList from '../../assets/MyRecipeList';

export default function FavoriteRecipes({ numRecipes }) {
    const [user] = useAuthState(auth);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    // Fetch input number of favorite documents from Firestore (refrences to the recipes)
    useEffect(() => {
        if (!user) return;

        const fetchFavorites = async () => {
            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            const favoritesQuery = query(favoritesRef, orderBy('dateAdded', 'desc'), limit(numRecipes));

            const unsubscribe = onSnapshot(favoritesQuery, async (snapshot) => {
                const favoritesList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (favoritesList.length > 0) {
                    const refs = favoritesList.map(favorite => favorite.recipeReference);

                    // Fetch the favorite recipes
                    const recipes = await Promise.all(refs.map(async (ref) => {
                        const docRef = doc(db, ref);
                        const docSnap = await getDoc(docRef);
                        return { id: docSnap.id, ...docSnap.data() };
                    }));
                    setFavoriteRecipes(recipes);
                } else {
                    setFavoriteRecipes([]);
                }
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        };

        fetchFavorites();
    }, [user, numRecipes]);

    return (
        <div>
            <MyRecipeList recipes={favoriteRecipes} />
        </div>
    );
}
