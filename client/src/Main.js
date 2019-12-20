import React, { Component } from 'react';

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="landing-header">
                    <h1>
                        <span className="landing-header-main">
                            This is the main page
                        </span>
                    </h1>
                </div>
                <ul className="slideshow">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                
            </div>
        );
    }
}


export default Main;