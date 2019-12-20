import React, { useState, useEffect, Component } from 'react';
import Page from './Page';

// SERVICES
import sprintsService from './services/sprintsService';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'landing',
        };
    }

    enter() {
        this.setState({
            page: 'main',
        });
    }

    render() {
        return (
            <div className="App">
                <Page page={this.state.page} onClick={this.enter.bind(this)} />
            </div>
        );
    }
}

export default App;
