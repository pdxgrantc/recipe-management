import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

// Utils
import { PageHelmet, PageDisplay, PageHeader, SubTitle } from '../../assets/Utils';


export default function RootBoundry() {
    const error = useRouteError();

    return (
        <PageDisplay>
            <div className='flex items-center justify-center'>
                <div className='flex flex-col items-start justify-center gap-2'>
                    <PageHelmet title='Error' />
                    <PageHeader title='Error' />
                    <SubTitle text='An unknown error occurred' />
                    <Link to='/' className='text-button page-button'>Return to Dashboard</Link>
                </div>
            </div>
        </PageDisplay>
    )
}
