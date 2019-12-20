import React, { Component } from 'react';
import './Landing.css';

class Landing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="landing-header">
                    <h1>
                        <span className="landing-header-main">
                            Something that is very helpful and improves the quality of life
                        </span>
                        <span className="landing-sub-header">
                            noun | UK <i className="volume up icon"></i>/bu:n/ | US <i className="volume up icon"></i>
                            /bu:n/
                        </span>
                    </h1>
                    <a onClick={this.props.onClick} className="ui inverted button btn-slideshow">
                        ENTER THE BOON!
                    </a>
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

export default Landing;
