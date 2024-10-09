import React from 'react'

import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Helmet, HelmetProvider } from 'react-helmet-async';


export function PageDisplay({ children }) {
    return (
        <>
            <div className='flex flex-col gap-5'>
                {children}
            </div>
        </>
    )
}

export function PageHeader({ title }) {
    // check to see if the url is root
    if (window.location.pathname === '/') {
        return (
            <>
                <HelmetProvider>
                    <Helmet>
                        <title>Ez recipe</title>
                    </Helmet>
                </HelmetProvider>

                <h1 className='text-pageTitle font-bold'>{title}</h1>
            </>
        )
    }

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