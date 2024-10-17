import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, isRouteErrorResponse, BrowserRouter, Routes, Route, NavLink, Link, Outlet } from 'react-router-dom';

// Firebase
import { auth, SignIn, SignOut } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import MyRecipes from './pages/MyRecipes/MyRecipes';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import MyRecipe from './pages/RecipePage/MyRecipe';
import Settings from './pages/Settings/Settings';

// Components
import SignInDialogue from './assets/SignInDialogue';

// icons
import { SiGithub as GitHubLogo } from "react-icons/si";
import { FaLinkedinIn as LinkedLogo } from "react-icons/fa";
import { IoPersonCircleSharp as AboutLogo } from "react-icons/io5";
import RootBoundry from './pages/RootBoundry/RootBoundry';


/*
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} caseSensitive={true}>
          <Route index element={<Dashboard />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/recipe/my/:id" element={<MyRecipe />} />
          <Route
            path="*"
            element={<RootBoundry />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<RootBoundry />} caseSensitive={true}>
      <Route index element={<Dashboard />} />
      <Route path="my-recipes" element={<MyRecipes />} />
      <Route path="create-recipe" element={<CreateRecipe />} />
      <Route path="settings" element={<Settings />} />
      <Route path="recipe/my/:id" element={<MyRecipe />} errorElement={<RootBoundry />} />
      <Route path="*" element={<RootBoundry />} />
    </Route>
  )
);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}

function Root(props) {
  const { children } = props
  const [user] = useAuthState(auth);

  return (
    <div className='text'>
      <Header />

      <div className='bg px-main py-10 pb-20 flex-grow' style={{ minHeight: "calc(100vh - 17.5rem)" }}>
        {user ? (
          <main className='flex flex-col gap-4'>{children || <Outlet />}</main>
        ) : (
          <div className='mt-20'>
            <SignInDialogue />
          </div>
        )}
      </div>
      <footer className="bg-black px-20 h-[12.5rem] flex justify-around flex-col">
        <div className="flex flex-col gap-2">
          <p className="mx-auto">Find me here</p>
          <div className="flex gap-6 w-fit mx-auto">
            <OutsideLink className="" link="https://www.github.com/pdxgrantc">
              <GitHubLogo className="h-[3.25rem] w-auto mx-auto text-button hover:text-button_hover" />
            </OutsideLink>
            <OutsideLink link="https://pdxgrantc.com/">
              <AboutLogo className="h-[3.5rem] w-auto text-button hover:text-button_hover" />
            </OutsideLink>
            <OutsideLink link="https://www.linkedin.com/in/pdxgrantc">
              <LinkedLogo className="h-[3.5rem] w-auto text-button hover:text-button_hover" />
            </OutsideLink>
          </div>
          <p className="mx-auto text-m">Grant Conklin - 2024</p>
        </div>
      </footer>
    </div>
  )
}

function Header() {
  const [user] = useAuthState(auth);

  return (
    <header className='bg-black h-20 flex justify-between px-main'>
      <Link to="/">
        <h1 className='text text-lheader font-semibold text-center'>Recipes</h1>
      </Link>
      <nav className='h-fit flex my-auto text-xxl gap-3 font-semibold'>
        {user &&
          <>
            <NavLink to="/" className="nav-button">Dashboard</NavLink>
            <NavLink to="my-recipes" className="nav-button">My Recipes</NavLink>
            <NavLink to="create-recipe" className="nav-button">Create Recipe</NavLink>
          </>
        }
        {user ?
          <div className='flex gap-5 h-fit'>
            <button className='nav-button' onClick={SignOut}>Sign Out</button>
            <img src={user.photoURL} alt={user.displayName} className='h-10 w-10 mt-1 rounded-full' />
          </div>
          :
          <button className='nav-button' onClick={SignIn}>Sign In</button>
        }
      </nav>
    </header>
  )
}

const OutsideLink = ({ children, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="buttons center w-fit flex gap-3 mt-1 hover:text-white hover:mt-0 hover:mb-1 font-semibold transition-all duration-300 ease-in-out"
    >
      {children}
    </a>
  );
};
