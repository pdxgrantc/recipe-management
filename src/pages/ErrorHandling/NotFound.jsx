// src/pages/NotFound.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// Utils
import { PageHelmet, PageDisplay, PageHeader, SubTitle } from '../../assets/Utils';


function NotFound() {
    const location = useLocation();

    // case where the location state is not defined (i.e. the user navigated to a non-existent route)
    if (!location.state) {
        return (
            <PageDisplay>
                <div className='flex items-center justify-center'>
                    <div className='flex flex-col items-start justify-center gap-2'>
                        <PageHelmet title='Error - 404' />
                        <PageHeader title='Error - 404' />
                        <SubTitle text='The page you are looking for does not exist.' />
                        <Link to='/' className='text-button page-button'>Return to Dashboard</Link>
                    </div>
                </div>
            </PageDisplay>
        )
    }

    const error = location.state?.error;

    // case where the location state is defined (i.e. the user navigated to a dynamic route that threw an error for some reason)
    return (
        <PageDisplay>
            <div className='flex items-center justify-center'>
                <div className='flex flex-col items-start justify-center gap-2'>
                    <PageHelmet title='Error - 404' />
                    <PageHeader title='Error - 404' />
                    <SubTitle text='An error occurred' />
                    {error ? <p>{error}</p> : <p>The page you are looking for does not exist.</p>}
                    <p>{error.status} {error?.statusText && `- {error.statusText}`}</p>
                    <Link to='/' className='text-button page-button'>Return to Dashboard</Link>
                </div>
            </div>
        </PageDisplay>
    )
}

export default NotFound;
