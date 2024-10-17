import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Firebase
import { auth, db, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
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

  const [recipe, setRecipe] = useState(null);
  const [photoURLs, setPhotoURLs] = useState([]);

  useEffect(() => {
    if (!user) return;

    const recipeRef = doc(db, 'users', user.uid, 'recipes', id);
    const unsubscribe = onSnapshot(recipeRef, (doc) => {
      if (doc.exists()) {
        const recipeNoId = doc.data();
        recipeNoId.id = doc.id;
        setRecipe(recipeNoId);
      } else {
        setRecipe(null);
      }
    });

    return () => unsubscribe();
  }, [user, id]);

  useEffect(() => {
    if (!user) return;

    fetchPhotoURLs();
  }, [user, id]);

  const fetchPhotoURLs = async () => {
    try {
      const storageRef = ref(storage, `users/${user.uid}/recipes/${id}`);
      const result = await listAll(storageRef);
      const urls = await Promise.all(result.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { id: item.name, url };
      }));
      setPhotoURLs(urls);
    } catch (error) {
      console.error('Error fetching photo URLs:', error);
    }
  };

  const handleDeletePhoto = async (photoId, index) => {
    try {
      const photoRef = ref(storage, `users/${user.uid}/recipes/${id}/${photoId}`);
      await deleteObject(photoRef);

      // delete the photo from the array
      const newPhotoURLs = [...photoURLs];
      newPhotoURLs.splice(index, 1);

      // update photoURLs state
      setPhotoURLs(newPhotoURLs);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  }

  return (
    <PageDisplay>
      {editing ?
        <EditRecipe recipe={recipe} setEditing={setEditing} photoURLs={photoURLs} handleDeletePhoto={handleDeletePhoto} fetchPhotoURLs={fetchPhotoURLs} />
        :
        <Recipe recipe={recipe} setEditing={setEditing} photoURLs={photoURLs} />
      }
    </PageDisplay>
  );
}
