import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import * as Pages from './pages';
import services from './services/realImpl';
import { PATHS } from './constants/data';
import { ServicesContext } from './services/context';
import './App.css';

const AppImpl: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: PATHS.login,
            element: (
                <Pages.Login />
            ),
        },
        {
            path: PATHS.register,
            element: (
                <Pages.Authentication.GuestPage>
                    <Pages.Register />
                </Pages.Authentication.GuestPage>
            ),
        },
        {
            path: PATHS.logout,
            element: <Pages.Logout />,
        },
        {
            path: `${PATHS.posts}${PATHS.add}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.AddPost />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.posts}/:id`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Post />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.posts,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Post />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.sprints}${PATHS.add}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.AddSprint />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.sprints}/:id${PATHS.edit}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.EditSprint />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.sprints}/:id`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Sprint />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.sprints,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Sprints />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.projects}${PATHS.add}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.AddProject />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.projects}${PATHS.edit}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.EditProject />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.projects}/:id`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Project />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.projects,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Projects />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.teams,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Team  />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.home,
            element: (
                <Pages.Authentication.GuestPage>
                    <Pages.Home />
                </Pages.Authentication.GuestPage>
            ),
        },
        {
            path: PATHS.root,
            element: <Navigate to={PATHS.home} />,
            // TODO:
            errorElement: <div>Error</div>
        }
    ]);

    return <RouterProvider router={router} fallbackElement={<div>Page not found</div>} />;
}

const App: React.FC = () => {
    return (
        <React.StrictMode>
            <ServicesContext.Provider value={services}>
                <AppImpl />
            </ServicesContext.Provider>
        </React.StrictMode>
    )
}

export default App;
