import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Main from './Main';
import Login from './Login';
import Register from './Register';

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
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/main">
                            <Main />
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
