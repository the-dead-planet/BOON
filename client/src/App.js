import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Sprints from './pages/Sprints';
import Login from './pages/Login';
import Register from './pages/Register';
import AddSprint from './pages/AddSprint';
import NavBar from './components/NavBar';
import './App.css';

class App extends Component {
    render() {
        return (
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
                            <NavBar />
                            <Login />
                        </Route>
                        <Route path="/register">
                            <NavBar />
                            <Register />
                        </Route>
                        <Route path="/sprints">
                            <NavBar />
                            <Sprints />
                        </Route>
                        <Route path="/add_sprint">
                            <NavBar />
                            <AddSprint />
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
