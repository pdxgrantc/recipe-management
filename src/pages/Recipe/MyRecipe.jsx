import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Firebase
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';

// Components
import Recipe from './Recipe';
import EditRecipe from './EditRecipe';

// Utils
import { PageDisplay } from '../../assets/Utils';


export default function MyRecipe() {
  const [user] = useAuthState(auth);
  const [editing, setEditing] = useState(false);
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeRef = doc(db, 'users', user.uid, 'recipes', id);
    const unsubscribe = onSnapshot(recipeRef, (doc) => {
      if (doc.exists()) {
        const recipeNoId = doc.data();
        recipeNoId.id = doc.id;
        setRecipe(recipeNoId);
      } else {
        // Handle the case where the document does not exist
        setRecipe(null); // or any other appropriate action
      }
    });

    return () => unsubscribe();
  }, [id]);


  return (
    <PageDisplay>
      {editing ? <EditRecipe recipe={recipe} setEditing={setEditing} /> : <Recipe recipe={recipe} setEditing={setEditing} />}
    </PageDisplay>
  )
}
