import React from 'react'

import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Helmet, HelmetProvider } from 'react-helmet-async';


export function PageDisplay({ children }) {
    return (
        <>
            <div className='flex flex-col gap-4'>
                {children}
            </div>
        </>
    )
}

export function PageHeader({ title }) {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Ez recipe - {title}</title>
                </Helmet>
            </HelmetProvider>

            <h1 className='text-pageTitle font-bold'>{title}</h1>
        </>
    )
}

export function SubTitle({ text }) {
    return (
        <h2 className='text-subTitle font-bold'>{text}</h2>
    )
}

export function TableHeader({ text }) {
    return (
        <h3 className='text-tableHeader font-bold'>{text}</h3>
    )
}

export async function HandleCreateRecipe(title, description, ingredients, steps) {
    const [user] = useAuthState(auth);
    // add this to firestore at /user/uid/recipes/randomrecipeidcreatedbyfirebase

    // title
    // description
    // ingredients
    // steps
    // user

    const recipe = {
        title,
        description,
        ingredients,
        steps
    }

    // write to firestore
    const userRef = db.collection('users').doc(user.uid);
    await userRef.collection('recipes').add(recipe);
}