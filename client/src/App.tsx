import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ServicesContext } from './services/context';
import services from './services/realImpl';
import * as Routes from './routes';
import * as Pages from './pages';
import './App.css';

const AppImpl: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: Routes.Types.RouterPaths.Login,
            element: (
                <Pages.Authentication.GuestPage>
                    <Pages.Login />
                </Pages.Authentication.GuestPage>
            ),
        },
        {
            path: Routes.Types.RouterPaths.Register,
            element: (
                <Pages.Authentication.GuestPage>
                    <Pages.Register />
                </Pages.Authentication.GuestPage>
            ),
        },
        {
            path: Routes.Types.RouterPaths.Logout,
            element: <Pages.Logout />,
        },
        {
            path: `${Routes.Types.RouterPaths.Posts}${Routes.Types.RouterPaths.Add}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.AddPost />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${Routes.Types.RouterPaths.Posts}/:id`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Post />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: Routes.Types.RouterPaths.Posts,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Post />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${Routes.Types.RouterPaths.Sprints}${Routes.Types.RouterPaths.Add}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.AddSprint />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${Routes.Types.RouterPaths.Sprints}/:id${Routes.Types.RouterPaths.Edit}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.EditSprint />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${Routes.Types.RouterPaths.Sprints}/:id`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Sprint />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: Routes.Types.RouterPaths.Sprints,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Sprints />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${Routes.Types.RouterPaths.Projects}${Routes.Types.RouterPaths.Add}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.AddProject />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${Routes.Types.RouterPaths.Projects}${Routes.Types.RouterPaths.Edit}`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.EditProject />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${Routes.Types.RouterPaths.Projects}/:id`,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Project />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: Routes.Types.RouterPaths.Projects,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Projects />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: Routes.Types.RouterPaths.Teams,
            element: (
                <Pages.Authentication.AuthenticatedPage>
                    <Pages.Team  />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: Routes.Types.RouterPaths.Home,
            element: (
                <Pages.Authentication.GuestPage>
                    <Pages.Home />
                </Pages.Authentication.GuestPage>
            ),
        },
        {
            path: Routes.Types.RouterPaths.Root,
            element: <Navigate to={Routes.Types.RouterPaths.Home} />,
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
