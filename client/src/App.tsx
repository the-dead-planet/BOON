import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import * as State from './State';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import AddSprint from './pages/AddSprint';
import AddProject from './pages/AddProject';
import AddPost from './pages/AddPost';
import EditSprint from './pages/EditSprint';
import Sprint from './pages/Sprint';
import Sprints from './pages/Sprints';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Post from './pages/Post';
import Team from './pages/Team';
import services from './services/realImpl';
import { StateType, Mode, ThemeType } from './logic/types';
import { PATHS } from './constants/data';
import { ServicesContext } from './services/context';
import { WrappedUserData } from './services/services';
import './App.css';

const App: React.FC = () => {
    const [state, setState] = React.useState<StateType>(State.INITIAL_STATE)
    const context = React.useContext(ServicesContext);

    // TODO: Consider moving this all to index.tsx, we can render a different "AppLoadingScreen" component while these requests are sent using root
    React.useEffect(() => {
        if (!context) {
            return;
        }
        console.log('init');
        context.authService.whoami().then(({ user }: WrappedUserData) => {
            setState((prev) => ({ ...prev, ...State.resolveWhoAmI(state)(user) }));
            // TODO: Currently users are populated based on authors of sprints and its children tree.
            // If current user has never posted anything, it is not present in app state, which
            // causes issues, such as no name displayed by a new comment.
            // Either add it here from whoami or load all users data separately, which on a long term can be not optimal
        });
    }, [context]);

    const onThemeTypeChange = (themeType: ThemeType) => {
        setState((prev) => ({ ...prev, themeType }));
    };

    const onModeChange = (mode: Mode) => {
        setState((prev) => ({ ...prev, mode }));
    };

    // TODO: Reduce necessity to add long comments, code should be understood by reading function names, func names should be more descriptive
    // Each function in the `State` module should be wrapped in `setState`
    // and passed `state` as the first argument.
    // Build a HOF performing these 2 steps to reduce boilerplate.
    // The resulting function will forward all arguments to `stateUpdater` and
    // invoke `setState` with the result.
    const updateState = (stateUpdater: any) => (...args: any) => {
        return setState(stateUpdater(state)(...args));
    };
    // Pack props into an object to reduce boilerplate code.
    const notificationsProps = {
        addNotification: updateState(State.addNotification),
        onNotificationShown: (...args: any) =>
            setTimeout(() => {
                updateState(State.popNotification)(...args);
            }, 5000),
        notifications: state.notifications,
    };

    const router = React.useMemo(
        () => createBrowserRouter([
            {
                path: PATHS.login,
                element: <Login
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    onLoginSuccess={updateState(State.setUser)}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.register,
                element: <Register
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    onSuccess={updateState(State.setUser)}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.logout,
                element: <Logout
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    onSuccess={updateState(State.clearUser)}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: `${PATHS.posts}${PATHS.add}`,
                element: <AddPost
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: `${PATHS.posts}/:id`,
                element: <Post
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    setStateData={updateState(State.setStateData)}
                    addSprintComment={updateState(State.addCommentToSprint)}
                    addPostComment={updateState(State.addCommentToPost)}
                    removeObject={updateState(State.removeObject)}
                    data={state.data}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.posts,
                element: <Post
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    setStateData={updateState(State.setStateData)}
                    addSprintComment={updateState(State.addCommentToSprint)}
                    addPostComment={updateState(State.addCommentToPost)}
                    removeObject={updateState(State.removeObject)}
                    data={state.data}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: `${PATHS.sprints}${PATHS.add}`,
                element: <AddSprint
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: `${PATHS.sprints}/:id${PATHS.edit}`,
                element: <EditSprint
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: `${PATHS.sprints}/:id`,
                element: <Sprint
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    setStateData={updateState(State.setStateData)}
                    addSprintComment={updateState(State.addCommentToSprint)}
                    addPostComment={updateState(State.addCommentToPost)}
                    removeObject={updateState(State.removeObject)}
                    data={state.data}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.sprints,
                element: <Sprints
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: `${PATHS.projects}${PATHS.add}`,
                element: <AddProject
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: `${PATHS.projects}${PATHS.edit}`,
                element: <AddProject
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: `${PATHS.projects}/:id`,
                element: <Project
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    setStateData={updateState(State.setStateData)}
                    addSprintComment={updateState(State.addCommentToSprint)}
                    addPostComment={updateState(State.addCommentToPost)}
                    removeObject={updateState(State.removeObject)}
                    data={state.data}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.projects,
                element: <Projects
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.teams,
                element: <Team
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    setState={updateState(State.setStateData)}
                    addSprintComment={updateState(State.addCommentToSprint)}
                    addPostComment={updateState(State.addCommentToPost)}
                    removeObject={updateState(State.removeObject)}
                    data={state.data}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.home,
                element: <Home
                    user={state.user}
                    themeType={state.themeType}
                    setThemeType={onThemeTypeChange}
                    mode={state.mode}
                    setMode={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.root,
                element: <Navigate to={PATHS.home} />,
                // TODO:
                errorElement: <div>Error</div>
            }
        ]),
        []
    );

    return !state.whoamiRequestDone ? (
        'Loading'
    ) : (
        <React.StrictMode>
            <ServicesContext.Provider value={services}>
                <RouterProvider
                    router={router}
                    //  TODO
                    fallbackElement={<div>Page not found</div>}
                />
            </ServicesContext.Provider>
        </React.StrictMode>
    );
}

export default App;
