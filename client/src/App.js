import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Sprints from './pages/Sprints';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import AddSprint from './pages/AddSprint';
import AddProject from './pages/AddProject';
import AddPost from './pages/AddPost';
import EditSprint from './pages/EditSprint';
import { SprintDetail } from './pages/SprintDetail';
import './App.css';
import authService from './services/authService';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            whoamiRequestDone: false,
            user: null,
        };
    }

    componentDidMount() {
        authService.whoami().then(({ user }) => {
            this.setState({ user, whoamiRequestDone: true });
        });
    }

    render() {
        const { whoamiRequestDone, user } = this.state;

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
                            <Login onLoginSuccess={user => this.setState({ user })} />
                        </Route>
                        <Route path="/register">
                            <Register user={user} onSuccess={user => this.setState({ user })} />
                        </Route>
                        <Route path="/logout">
                            <Logout user={user} onSuccess={() => this.setState({ user: null })} />
                        </Route>
                        <Route path="/sprints/:id/edit">
                            <EditSprint user={user} />
                        </Route>
                        <Route path="/sprints/:id/add_post">
                            <AddPost user={user} />
                        </Route>
                        <Route path="/sprints/:id">
                            <SprintDetail user={user} />
                        </Route>
                        <Route path="/sprints">
                            <Sprints user={user} />
                        </Route>
                        <Route path="/add_sprint">
                            <AddSprint user={user} />
                        </Route>
                        <Route path="/add_project">
                            <AddProject user={user} />
                        </Route>
                        <Route path="/add_post">
                            <AddPost user={user} />
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
