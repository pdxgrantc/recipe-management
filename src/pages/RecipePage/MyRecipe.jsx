import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Firebase
import { auth, db, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

// Components
import Recipe from './Recipe';
import EditRecipe from './EditRecipe';

// Utils
import { PageDisplay } from '../../assets/Utils';


export default function MyRecipe() {
  const [user] = useAuthState(auth);
  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [photoURL, setPhotoURL] = useState([]);
  const [error, setError] = useState(null);

  // UseEffect to fetch the recipe from the database and call fetchPhotoURL
  useEffect(() => {
    async function fetchRecipe() {
      try {
        const recipeRef = doc(db, "users", user.uid, 'recipes', id);
        const docSnap = await getDoc(recipeRef);

        if (docSnap.exists()) {
          const recipeNoId = docSnap.data();
          recipeNoId.id = docSnap.id;
          setRecipe(recipeNoId);
        } else {
          // Recipe doesn't exist or user doesn't have access
          throw new Error('Recipe not found.');
        }
      } catch (err) {
        setError(err);
        navigate('/404', {
          state: {
            code: 404,
            error: err.message
          }
        }); // Navigate to the 404 error page
      }
    }

    fetchRecipe();
  }, [id, user.uid, navigate]);

  useEffect(() => {
    if (!user) return;

    // fetch the photo URL after a recipe is successfully fetched
    fetchPhotoURL();
  }, [user, id]);

  const fetchPhotoURL = async () => {
    try {
      const storageRef = ref(storage, `users/${user.uid}/recipes/${id}`);
      const result = await listAll(storageRef);

      if (result.items.length > 0) {
        const firstItem = result.items[0];
        const downloadURL = await getDownloadURL(firstItem);
        const urlOBJ = { id: firstItem.name, url: downloadURL };
        setPhotoURL(urlOBJ);
      } else {
        setPhotoURL([]); // No photos found
      }
    } catch (error) {
      console.error('Error fetching photo URL:', error);
    }
  };

  const handleDeletePhoto = async (photoId, index) => {
    try {
      const photoRef = ref(storage, `users/${user.uid}/recipes/${id}/${photoId}`);
      await deleteObject(photoRef);

      // delete the photo from the array
      const newPhotoURL = [...photoURL];
      newPhotoURL.splice(index, 1);

      // update photoURL state
      setPhotoURL(newPhotoURL);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  }

  return (
    <PageDisplay>
      {editing ?
        <EditRecipe recipe={recipe} setEditing={setEditing} photoURL={photoURL} handleDeletePhoto={handleDeletePhoto} fetchPhotoURL={fetchPhotoURL} />
        :
        <Recipe recipe={recipe} setEditing={setEditing} photoURL={photoURL} />
      }
    </PageDisplay>
  );
}
