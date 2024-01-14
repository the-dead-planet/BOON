import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import * as State from './state';
import * as Pages from './pages';
import services from './services/realImpl';
import { StateType, Mode, ThemeType, User, Notification } from './logic/types';
import { PATHS } from './constants/data';
import { ServicesContext, useServices } from './services/context';
import { WrappedUserData } from './services/services';
import './App.css';

const AppImpl: React.FC = () => {
    const [state, setState] = React.useState<StateType>(State.INITIAL_STATE)
    const services = useServices();

    // TODO: Consider moving this all to index.tsx, we can render a different "AppLoadingScreen" component while these requests are sent using root
    React.useEffect(() => {
        if (!services) {
            return;
        }
        services.authService.whoami().then(({ user }: WrappedUserData) => {
            setState((prev) => ({ ...prev, ...State.resolveWhoAmI(state)(user) }));
            // TODO: Currently users are populated based on authors of sprints and its children tree.
            // If current user has never posted anything, it is not present in app state, which
            // causes issues, such as no name displayed by a new comment.
            // Either add it here from whoami or load all users data separately, which on a long term can be not optimal
        });
    }, [services]);

    const onThemeTypeChange = (themeType: ThemeType) => {
        setState((prev) => ({ ...prev, themeType }));
    };

    const onModeChange = (mode: Mode) => {
        setState((prev) => ({ ...prev, mode }));
    };


    // Pack props into an object to reduce boilerplate code.
    const notificationsProps = {
        addNotification: (notification: Notification) => setState((prev) => ({
            ...prev,
            notifications: state.notifications.concat([notification]),
        })),
        onNotificationShown: (notificationId: string) =>
            setTimeout(() => {
                setState((prev) => ({ ...prev, notifications: prev.notifications.filter((n) => n.id !== notificationId) }))
            }, 5000),
        notifications: state.notifications,
    };

    const handleLoginSuccess = (user: User) => {
        setState((prev) => ({ ...prev, user }))
    }

    const handleClearUser = () => {
        setState((prev) => ({ ...prev, user: null }))
    }

    const router = createBrowserRouter([
        {
            path: PATHS.login,
            element: (
                <Pages.Login
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    onLoginSuccess={handleLoginSuccess}
                    notificationsProps={notificationsProps}
                    showError={() => { }}
                />
            ),
        },
        {
            path: PATHS.register,
            element: (
                <Pages.Authentication.GuestPage user={state.user}>
                    <Pages.Register
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        onSuccess={handleLoginSuccess}
                        notificationsProps={notificationsProps}
                        showError={() => { }}
                    />
                </Pages.Authentication.GuestPage>
            ),
        },
        {
            path: PATHS.logout,
            element: <Pages.Logout
                user={state.user}
                themeType={state.themeType}
                onThemeTypeChange={onThemeTypeChange}
                mode={state.mode}
                onModeChange={onModeChange}
                onSuccess={handleClearUser}
                notificationsProps={notificationsProps}
                showError={(err) => console.error(err)}
            />,
        },
        {
            path: `${PATHS.posts}${PATHS.add}`,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.AddPost
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        notificationsProps={notificationsProps}
                        showError={(err) => console.error(err)}
                        sprintId=''
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.posts}/:id`,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.Post
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        setStateData={([sprints, projects, users]) => State.setStateData(state, sprints, projects, users)}
                        addSprintComment={(id, comment) => State.addCommentToSprint(state)(id, comment)}
                        addPostComment={(id, comment) => State.addCommentToPost(state)(id, comment)}
                        removeObject={(obj) => State.removeObject(state)(obj)}
                        data={state.data}
                        notificationsProps={notificationsProps}
                        backTo={{ name: '', path: '' }}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.posts,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.Post
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        setStateData={([sprints, projects, users]) => State.setStateData(state, sprints, projects, users)}
                        addSprintComment={(id, comment) => State.addCommentToSprint(state)(id, comment)}
                        addPostComment={(id, comment) => State.addCommentToPost(state)(id, comment)}
                        removeObject={(obj) => State.removeObject(state)(obj)}
                        data={state.data}
                        notificationsProps={notificationsProps}
                        backTo={{ name: '', path: '' }}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.sprints}${PATHS.add}`,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.AddSprint
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        notificationsProps={notificationsProps}
                        push={() => { }}
                        showError={(err: Error) => console.error(err)}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.sprints}/:id${PATHS.edit}`,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.EditSprint
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        notificationsProps={notificationsProps}
                        push={() => { }}
                        showError={(err) => console.error(err)}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.sprints}/:id`,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.Sprint
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        setStateData={([sprints, projects, users]) => State.setStateData(state, sprints, projects, users)}
                        addSprintComment={(id, comment) => State.addCommentToSprint(state)(id, comment)}
                        addPostComment={(id, comment) => State.addCommentToPost(state)(id, comment)}
                        removeObject={(obj) => State.removeObject(state)(obj)}
                        data={state.data}
                        notificationsProps={notificationsProps}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.sprints,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.Sprints
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        notificationsProps={notificationsProps}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.projects}${PATHS.add}`,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.AddProject
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        notificationsProps={notificationsProps}
                        push={() => { }}
                        showError={(err: Error) => console.error(err)}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.projects}${PATHS.edit}`,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.AddProject
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        notificationsProps={notificationsProps}
                        push={() => { }}
                        showError={(err: Error) => console.error(err)}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: `${PATHS.projects}/:id`,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.Project
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        setStateData={([sprints, projects, users]) => State.setStateData(state, sprints, projects, users)}
                        addSprintComment={(id, comment) => State.addCommentToSprint(state)(id, comment)}
                        addPostComment={(id, comment) => State.addCommentToPost(state)(id, comment)}
                        removeObject={(obj) => State.removeObject(state)(obj)}
                        data={state.data}
                        notificationsProps={notificationsProps}
                        showError={(err) => console.error(err)}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.projects,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.Projects
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        notificationsProps={notificationsProps}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.teams,
            element: (
                <Pages.Authentication.AuthenticatedPage user={state.user}>
                    <Pages.Team
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        notificationsProps={notificationsProps}
                    />
                </Pages.Authentication.AuthenticatedPage>
            ),
        },
        {
            path: PATHS.home,
            element: (
                <Pages.Authentication.GuestPage user={state.user}>
                    <Pages.Home
                        user={state.user}
                        themeType={state.themeType}
                        onThemeTypeChange={onThemeTypeChange}
                        mode={state.mode}
                        onModeChange={onModeChange}
                        notificationsProps={notificationsProps}
                        push={() => { }}
                        showError={(err: Error) => console.error(err)}
                    />
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

    return !state.whoamiRequestDone ? (
        'Loading'
    ) : <RouterProvider router={router} fallbackElement={<div>Page not found</div>} />;
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
