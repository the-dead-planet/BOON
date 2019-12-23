import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = (props) => (
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
            <Link to={'/sprints'} className="btn-slideshow">
                ENTER THE BOON
                    </Link>
        </div>
        <ul className="slideshow">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
)

export default Landing;
