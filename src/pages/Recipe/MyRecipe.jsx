import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Firebase
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import Recipe from './Recipe';


export default function MyRecipe() {
  const [user] = useAuthState(auth);
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeRef = doc(db, 'users', user.uid, 'recipes', id);
    const unsubscribe = onSnapshot(recipeRef, (doc) => {
      setRecipe(doc.data());
    });

    return () => unsubscribe();
  }, [id]);


  return (
    <Recipe recipe={recipe} />
  )
}
