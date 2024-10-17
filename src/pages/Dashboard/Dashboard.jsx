import React from 'react'

// Components
import MyRecentRecipes from '../../assets/MyRecentRecipes';

// Utils
import { PageDisplay, PageHelmet, SubTitle } from '../../assets/Utils';
import { Link } from 'react-router-dom';


export default function Dashboard() {
    return (
        <>
            <PageHelmet title={"Dashboard"} />
            <PageDisplay>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-5 justify-between'>
                        <SubTitle text='Your Recently Updated Recipes ' />
                        <Link to='/my-recipes' className='page-button text-button'>View All</Link>
                    </div>
                    <MyRecentRecipes numRecipes={6} />
                </div>
            </PageDisplay>
        </>
    )
}
