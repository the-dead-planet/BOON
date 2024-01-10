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
import { StateType, Mode, ThemeType, User, Notification } from './logic/types';
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


    // Pack props into an object to reduce boilerplate code.
    const notificationsProps = {
        addNotification: (notification: Notification) => setState((prev) => ({ 
            ...prev, 
            notifications: state.notifications.concat([notification]),
        })),
        onNotificationShown: (notificationId: string) =>
            setTimeout(() => {
                setState((prev) => ({ ...prev, notifications: prev.notifications.filter((n) => n.id !== notificationId)}))
            }, 5000),
        notifications: state.notifications,
    };

    const handleLoginSuccess = (user: User) => {
        setState((prev) => ({ ...prev, user }))
    }

    const handleClearUser = () => {
        setState((prev) => ({ ...prev, user: null }))
    }

    const router = React.useMemo(
        () => createBrowserRouter([
            {
                path: PATHS.login,
                element: <Login
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    onLoginSuccess={handleLoginSuccess}
                    notificationsProps={notificationsProps}
                    showError={() => {}}
                />,
            },
            {
                path: PATHS.register,
                element: <Register
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    onSuccess={handleLoginSuccess}
                    notificationsProps={notificationsProps}
                    showError={() => {}}
                />,
            },
            {
                path: PATHS.logout,
                element: <Logout
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
                element: <AddPost
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    notificationsProps={notificationsProps}
                    showError={(err) => console.error(err)}
                    sprintId=''
                    
                />,
            },
            {
                path: `${PATHS.posts}/:id`,
                element: <Post
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
                    backTo={{ name: '', path: ''}}
                />,
            },
            {
                path: PATHS.posts,
                element: <Post
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
                    backTo={{ name: '', path: ''}}
                />,
            },
            {
                path: `${PATHS.sprints}${PATHS.add}`,
                element: <AddSprint
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    notificationsProps={notificationsProps}
                    push={() => {}}
                    showError={(err) => console.error(err)}
                />,
            },
            {
                path: `${PATHS.sprints}/:id${PATHS.edit}`,
                element: <EditSprint
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    notificationsProps={notificationsProps}
                    push={() => {}}
                    showError={(err) => console.error(err)}
                />,
            },
            {
                path: `${PATHS.sprints}/:id`,
                element: <Sprint
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
                />,
            },
            {
                path: PATHS.sprints,
                element: <Sprints
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: `${PATHS.projects}${PATHS.add}`,
                element: <AddProject
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    notificationsProps={notificationsProps}
                    push={() => {}}
                    showError={(err) => console.error(err)}
                />,
            },
            {
                path: `${PATHS.projects}${PATHS.edit}`,
                element: <AddProject
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    notificationsProps={notificationsProps}
                    push={() => {}}
                    showError={(err) => console.error(err)}
                />,
            },
            {
                path: `${PATHS.projects}/:id`,
                element: <Project
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
                />,
            },
            {
                path: PATHS.projects,
                element: <Projects
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.teams,
                element: <Team
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    notificationsProps={notificationsProps}
                />,
            },
            {
                path: PATHS.home,
                element: <Home
                    user={state.user}
                    themeType={state.themeType}
                    onThemeTypeChange={onThemeTypeChange}
                    mode={state.mode}
                    onModeChange={onModeChange}
                    notificationsProps={notificationsProps}
                    push={() => {}}
                    showError={(err) => console.error(err)}
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
