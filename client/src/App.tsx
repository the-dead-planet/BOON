import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
import './App.css';
import services from './services/realImpl';
import ScrollToTop from './utils/ScrollToTop';
import { StateType, Mode, ThemeType } from './logic/types';
import { PATHS } from './constants/data';
import { ServicesContext, useServices } from './services/context';
import { WrappedUserData } from './services/services';

const { root, home, sprints, projects, teams, posts, login, logout, register, add, edit, addPost } = PATHS;

// TODO: use a pure functional component with hooks, instead of a class component.
// It will make it a bit easier to handle a Context object.
class AppImpl extends Component<{}, StateType> {
    static contextType = ServicesContext;

    constructor(props: any) {
        super(props);
        this.state = State.INITIAL_STATE;
    }

    // TODO: Change to pass value of model User, not UserAuth
    componentDidMount() {
        const { authService } = this.context!;
        authService.whoami().then(({ user }: WrappedUserData) => {
            this.setState(State.resolveWhoAmI(this.state)(user));
            // TODO: Currently users are populated based on authors of sprints and its children tree.
            // If current user has never posted anything, it is not present in app state, which
            // causes issues, such as no name displayed by a new comment.
            // Either add it here from whoami or load all users data separately, which on a long term can be not optimal
        });
    }

    // TODO: move to state methods
    setThemeType = (themeType: ThemeType) => {
        this.setState({ themeType: themeType });
    };
    setMode = (mode: Mode) => {
        this.setState({ mode: mode });
    };

    render() {
        const { whoamiRequestDone, user, notifications } = this.state;

        // Each function in the `State` module should be wrapped in `setState`
        // and passed `state` as the first argument.
        // Build a HOF performing these 2 steps to reduce boilerplate.
        // The resulting function will forward all arguments to `stateUpdater` and
        // invoke `setState` with the result.
        const updateState = (stateUpdater: any) => (...args: any) => {
            return this.setState(stateUpdater(this.state)(...args));
        };

        // Pack props into an object to reduce boilerplate code.
        const notificationsProps = {
            addNotification: updateState(State.addNotification),
            onNotificationShown: (...args: any) =>
                setTimeout(() => {
                    updateState(State.popNotification)(...args);
                }, 5000),
            notifications,
        };

        return !whoamiRequestDone ? (
            'Loading'
        ) : (
            <Router>
                <ScrollToTop>
                    <div className="App">
                        <Switch>
                            {/*
                            A Switch will iterate through all routes and return
                            on the first match.
                            The order matters - the most generic paths should
                            be at the very end.
                        */}

                            {/* Authentication */}
                            <Route path={login}>
                                <Login
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    onLoginSuccess={updateState(State.setUser)}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={register}>
                                <Register
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    onSuccess={updateState(State.setUser)}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={logout}>
                                <Logout
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    onSuccess={updateState(State.clearUser)}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>

                            {/* Posts - add to sprint, display single */}
                            {/* TODO: consider leaving only /posts/add ; /posts/:id and passing related sprint/project id as optional url parameters */}
                            <Route path={`${posts}${add}`}>
                                <AddPost
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={`${posts}/:id`}>
                                <Post
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    setStateData={updateState(State.setStateData)}
                                    addSprintComment={updateState(State.addCommentToSprint)}
                                    addPostComment={updateState(State.addCommentToPost)}
                                    removeObject={updateState(State.removeObject)}
                                    data={this.state.data}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={posts}>
                                <Post
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    setStateData={updateState(State.setStateData)}
                                    addSprintComment={updateState(State.addCommentToSprint)}
                                    addPostComment={updateState(State.addCommentToPost)}
                                    removeObject={updateState(State.removeObject)}
                                    data={this.state.data}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>

                            {/* Sprints */}
                            <Route path={`${sprints}${add}`}>
                                <AddSprint
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={`${sprints}/:id${edit}`}>
                                <EditSprint
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={`${sprints}/:id`}>
                                <Sprint
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    setStateData={updateState(State.setStateData)}
                                    addSprintComment={updateState(State.addCommentToSprint)}
                                    addPostComment={updateState(State.addCommentToPost)}
                                    removeObject={updateState(State.removeObject)}
                                    data={this.state.data}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={sprints}>
                                <Sprints
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>

                            {/* Projects */}
                            <Route path={`${projects}${add}`}>
                                <AddProject
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={`${projects}${edit}`}>
                                <AddProject
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={`${projects}/:id`}>
                                <Project
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    setStateData={updateState(State.setStateData)}
                                    addSprintComment={updateState(State.addCommentToSprint)}
                                    addPostComment={updateState(State.addCommentToPost)}
                                    removeObject={updateState(State.removeObject)}
                                    data={this.state.data}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={projects}>
                                <Projects
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>

                            {/* Teams and users */}
                            <Route path={teams}>
                                <Team
                                    user={user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    setState={updateState(State.setStateData)}
                                    addSprintComment={updateState(State.addCommentToSprint)}
                                    addPostComment={updateState(State.addCommentToPost)}
                                    removeObject={updateState(State.removeObject)}
                                    data={this.state.data}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>

                            {/* Home */}
                            <Route path={home}>
                                <Home
                                    user={this.state.user}
                                    themeType={this.state.themeType}
                                    setThemeType={this.setThemeType}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>

                            {/* On root '/' redirect to the home page */}
                            <Route exact path={root}>
                                <Redirect to={home} />
                            </Route>
                        </Switch>
                    </div>
                </ScrollToTop>
            </Router>
        );
    }
}

// Wrap the AppImpl object with a context provider.
// After rewriting AppImpl to a pure functional component, get rid of the
// wrapper.
const App = () => (
    <ServicesContext.Provider value={services}>
        <AppImpl />
    </ServicesContext.Provider>
);

export default App;
