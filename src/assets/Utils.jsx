import React from 'react'

import { Helmet, HelmetProvider } from 'react-helmet-async';


export function PageDisplay({ children, classes }) {
    return (
        <>
            <div className={`flex flex-col gap-5 ${classes ? classes : ''}`}>
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
                        <title>Ez Recipe</title>
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
                    <title>Ez Recipe - {title}</title>
                </Helmet>
            </HelmetProvider>

            <h1 className='text-pageTitle font-bold'>{title}</h1>
        </>
    )
}

export function PageHelmet({ title }) {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Ez recipe - {title}</title>
            </Helmet>
        </HelmetProvider>
    )
}

export function SubTitle({ text, classes }) {
    return (
        <h2 className={`text-subTitle font-bold ${classes ? classes : ''}`}>
            {text}
        </h2>
    );
}

export function TableHeader({ text }) {
    return (
        <h3 className='text-tableHeader font-bold'>{text}</h3>
    )
}

export function SwitchButton({ text, onClick }) {
    return (
        <button name={text} className='text-button page-button' onClick={onClick}>
            <p>{text}</p>
        </button>
    )
}
