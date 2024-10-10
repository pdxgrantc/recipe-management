import React from 'react'

// Components
import MyRecentRecipes from '../../assets/MyRecentRecipes';

// Utils
import { PageDisplay, PageHelmet, SubTitle } from '../../assets/Utils';

export default function Dashboard() {
    return (
        <>
            <PageHelmet title={"Dashboard"} />
            <PageDisplay>
                <div>
                    <SubTitle text='Recently Updated Recipes' />
                </div>
                <MyRecentRecipes numRecipes={5} />
            </PageDisplay>
        </>
    )
}
