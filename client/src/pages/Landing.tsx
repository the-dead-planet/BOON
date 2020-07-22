import React from 'react';
import { withPush } from '../utils/routingDecorators';
import { guestPage } from '../utils/authenticatedPage';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const Landing = (props: any) => (
    <React.Fragment>
        <div className="fade-in">
            <div className="landing-header">
                <Typography variant="h4">Something that is very helpful and improves the quality of life</Typography>
                <Typography className="offset" variant="h5">
                    noun | UK <VolumeUpIcon />
                    /bu:n/ | US <VolumeUpIcon /> /bu:n/
                </Typography>
                <Link to={'/sprints'} className="btn-slideshow">
                    ENTER THE BOON
                </Link>
            </div>
        </div>
        <ul className="slideshow">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </React.Fragment>
);

export default guestPage(withPush(Landing));
