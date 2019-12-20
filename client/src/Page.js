import React, { Component } from 'react';
import Landing from './Landing';
import Main from './Main';

class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const pages = [
            {
                id: 0,
                name: "landing",
                html: <Landing onClick={() => this.props.onClick("main")} />
            },
            {
                id: 1,
                name: "main",
                html: <Main onClick={() => this.props.onClick("landing")} />
            }
        ];

        return (
            <div>
                {pages.filter(page => (
                    page.name === this.props.page
                ))[0].html};
            </div>
            // this.props.page === 0 ? <Landing onClick={() => this.props.onClick(1)} /> : <Main />
        );
    }
}


export default Page;