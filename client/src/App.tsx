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
import Project from './pages/Project';
import Teams from './pages/Teams';
import './App.css';
import authService from './services/authService';
import ScrollToTop from './utils/ScrollToTop';
import { StateType, Mode } from './logic/types';
import { PATHS } from './constants/data';

const { root, home, sprints, projects, teams, main, login, logout, register, addSprint, addPost, addProject } = PATHS;

class App extends Component<{}, StateType> {
    constructor(props: any) {
        super(props);
        this.state = State.INITIAL_STATE;
    }

    // TODO: Change to pass value of model User, not UserAuth
    componentDidMount() {
        authService.whoami().then(({ user }) => {
            this.setState(State.resolveWhoAmI(this.state)(user));
        });
    }

    // TODO: move to state methods
    setMode = (mode: Mode) => {
        this.setState({ mode: mode });
    };

    render() {
        const { whoamiRequestDone, user, notifications } = this.state;
        console.log(this.state.data);
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
                            <Route path={login}>
                                <Login
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    onLoginSuccess={updateState(State.setUser)}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={register}>
                                <Register
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    onSuccess={updateState(State.setUser)}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={logout}>
                                <Logout
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    onSuccess={updateState(State.clearUser)}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={home}>
                                <Home user={this.state.user} mode={this.state.mode} setMode={this.setMode} />
                            </Route>
                            <Route path="/sprints/:id/edit">
                                <EditSprint
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path="/sprints/:id/add_post">
                                <AddPost
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={'/sprints/:id'}>
                                <Sprint
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    setState={updateState(State.setSprints)}
                                    addSprintComment={updateState(State.addCommentToSprint)}
                                    addPostComment={updateState(State.addCommentToPost)}
                                    removeObject={updateState(State.removeObject)}
                                    data={this.state.data}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={projects}>
                                <Project
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    setState={updateState(State.setSprints)}
                                    addSprintComment={updateState(State.addCommentToSprint)}
                                    addPostComment={updateState(State.addCommentToPost)}
                                    removeObject={updateState(State.removeObject)}
                                    data={this.state.data}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={teams}>
                                <Teams
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    setState={updateState(State.setSprints)}
                                    addSprintComment={updateState(State.addCommentToSprint)}
                                    addPostComment={updateState(State.addCommentToPost)}
                                    removeObject={updateState(State.removeObject)}
                                    data={this.state.data}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            {/* /sprints - redirect to the sprint page with  */}
                            <Route path={main}>
                                <Sprint
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    setState={updateState(State.setSprints)}
                                    addSprintComment={updateState(State.addCommentToSprint)}
                                    addPostComment={updateState(State.addCommentToPost)}
                                    removeObject={updateState(State.removeObject)}
                                    data={this.state.data}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={addSprint}>
                                <AddSprint
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={addProject}>
                                <AddProject
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>
                            <Route path={addPost}>
                                <AddPost
                                    user={user}
                                    mode={this.state.mode}
                                    setMode={this.setMode}
                                    notificationsProps={notificationsProps}
                                />
                            </Route>

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

export default App;
