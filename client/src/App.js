import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as State from './State';
import Landing from './pages/Landing';
import Sprints from './pages/Sprints';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import AddSprint from './pages/AddSprint';
import AddProject from './pages/AddProject';
import AddPost from './pages/AddPost';
import EditSprint from './pages/EditSprint';
import Sprint from './pages/Sprint';
import './App.css';
import authService from './services/authService';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = State.INITIAL_STATE;
    }

    // TODO: Change to pass value of model User, not UserAuth
    componentDidMount() {
        authService.whoami().then(({ user }) => {
            this.setState(State.resolveWhoAmI(this.state)(user));
        });
    }

    render() {
        const { whoamiRequestDone, user, notifications } = this.state;

        // Each function in the `State` module should be wrapped in `setState`
        // and passed `state` as the first argument.
        // Build a HOF performing these 2 steps to reduce boilerplate.
        // The resulting function will forward all arguments to `stateUpdater` and
        // invoke `setState` with the result.
        const updateState = stateUpdater => (...args) => this.setState(stateUpdater(this.state)(...args));

        // Pack props into an object to reduce boilerplate code.
        const notificationsProps = {
            addNotification: updateState(State.addNotification),
            onNotificationShown: (...args) =>
                setTimeout(() => {
                    updateState(State.popNotification)(...args);
                }, 5000),
            notifications,
        };

        return !whoamiRequestDone ? (
            'Loading'
        ) : (
            <Router>
                <div className="App">
                    <Switch>
                        {/*
                            A Switch will iterate through all routes and return
                            on the first match.
                            The order matters - the most generic paths should
                            be at the very end.
                        */}
                        <Route path="/login">
                            <Login
                                onLoginSuccess={updateState(State.setUser)}
                                notificationsProps={notificationsProps}
                            />
                        </Route>
                        <Route path="/register">
                            <Register
                                user={user}
                                onSuccess={updateState(State.setUser)}
                                notificationsProps={notificationsProps}
                            />
                        </Route>
                        <Route path="/logout">
                            <Logout
                                user={user}
                                onSuccess={updateState(State.clearUser)}
                                notificationsProps={notificationsProps}
                            />
                        </Route>
                        <Route path="/sprints/:id/edit">
                            <EditSprint user={user} notificationsProps={notificationsProps} />
                        </Route>
                        <Route path="/sprints/:id/add_post">
                            <AddPost user={user} notificationsProps={notificationsProps} />
                        </Route>
                        <Route path="/sprints/:id">
                            <Sprint
                                user={user}
                                setSprints={updateState(State.setSprints)}
                                sprints={this.state.sprints}
                                notificationsProps={notificationsProps}
                            />
                        </Route>
                        <Route path="/sprints">
                            <Sprints
                                user={user}
                                setSprints={updateState(State.setSprints)}
                                notificationsProps={notificationsProps}
                            />
                        </Route>
                        <Route path="/add_sprint">
                            <AddSprint user={user} notificationsProps={notificationsProps} />
                        </Route>
                        <Route path="/add_project">
                            <AddProject user={user} notificationsProps={notificationsProps} />
                        </Route>
                        <Route path="/add_post">
                            <AddPost user={user} notificationsProps={notificationsProps} />
                        </Route>
                        <Route path="/">
                            <Landing />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
