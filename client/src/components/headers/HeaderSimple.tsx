import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Box, Button, Typography } from '@material-ui/core';
import arrow from '../../img/downarrow.png';
import { Landing } from '../../logic/types';

// Use this header above a container component with id="main-content" to allow proper scrolling effect on click on the arrow img icon
const HeaderSimple = ({ user, mode, setMode, title, subtitle, button }: Landing) => {
    const classes = useStyles();

    return (
        <Box className={classes.headerSimple}>
            {/* <Box className={`${classes.headerLightning} ${classes.popIn}`}>
                    ⚡
                </Box> */}
            {/* Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch  */}
            <svg
                className={`${classes.headerSimpleLightning} ${classes.popIn}`}
                width="105px"
                height="86px"
                viewBox="0 0 210 173"
            >
                <defs></defs>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeDasharray="10,5">
                    <g id="Artboard" strokeWidth="8" stroke="#EEEEEE">
                        <g id="rocky" transform="translate(2.000000, 3.000000)">
                            <polygon id="Shape" points="32 39.6 58 9.6 127.5 0.2 146.4 30.9 175.7 46.7 204.9 150.1 162.2 165.1 93.6 157.2 13 160.4 1.2 113 18.6 102.8 24.1 41.2"></polygon>
                        </g>
                    </g>
                </g>
            </svg>

            <Typography className={`${classes.headerSimpleTitle} ${classes.popIn}`} variant="h2">
                {title}
            </Typography>

            <Typography className={`${classes.headerSimpleSubtitle} ${classes.popIn}`} variant="h6">
                {subtitle}
            </Typography>
            
            <Link to={button.path} className={`${classes.headerSimpleButton} ${classes.popIn}`}>
                <Button variant="contained" size="large" color="secondary" style={{ margin: "1em" }}>
                    {button.name}
                </Button>
            </Link>

            <HashLink to="#main-content" smooth={true}>
                <img className={classes.headerDownArrow} src={arrow} width="50"/>
            </HashLink>
        </Box>
    );
}


export default HeaderSimple;