import React from 'react';
import { useStyles } from '../../styles/landing';
import { Link, HashLink } from '../../utils/Link';
import { Box, Typography } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import arrow from '../../img/downarrow.png';
import { Landing } from '../../logic/types';

// Use this header above a container component with id="main-content" to allow proper scrolling effect on click on the arrow img icon
const Header = ({ user, mode, setMode, title, subtitle, button }: Landing) => {
    const classes = useStyles();

    return (
        <Box className={classes.headerSimple}>
            <div className={classes.fadeIn}>
                <div className={classes.landingHeader}>
                    <Typography variant="h4">
                        Something that is very helpful and improves the quality of life
                    </Typography>
                    <Typography className={classes.offset} variant="h5">
                        noun | UK <VolumeUpIcon />
                        /bu:n/ | US <VolumeUpIcon /> /bu:n/
                    </Typography>
                    <Link to={'/sprints'} className={classes.btnSlideshow}>
                        ENTER THE BOON
                    </Link>
                </div>
            </div>
            <ul className={classes.slideshow}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <HashLink to="#main-content">
                <img className={classes.headerDownArrow} src={arrow} width="50" />
            </HashLink>
        </Box>
    );
};

export default Header;
