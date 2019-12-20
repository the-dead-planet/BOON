import React, { Component } from 'react';
import Landing from './Landing';
import Main from './Main';

class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            this.props.page === "landing" ? <Landing onClick={this.props.onClick} /> : <Main />
        );
    }
}


export default Page;