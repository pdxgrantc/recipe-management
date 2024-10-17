import React, {useState} from 'react'

import { Helmet, HelmetProvider } from 'react-helmet-async';

import Switch from '@mui/material/Switch';


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

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export function SwitchButton({ text, onClick }) {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
        onClick();
    };

    return (
        <div className='switch-container'>
            <label className='switch-label'>{text}</label>
            <Switch
                checked={isOn}
                onChange={handleToggle}
                {...label}
            />
        </div>
    )
}