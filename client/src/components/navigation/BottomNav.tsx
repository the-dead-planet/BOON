import React from 'react';
import { useStyles } from '../../styles/main';
import { Zoom, Fab } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { User } from '../../logic/types';

interface Props {
    user: User;
}

export const BottomNav = ({ user }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.fabContainer}>
            <Zoom
                in={true}
                timeout={1000}
                style={{
                    transitionDelay: `500ms`,
                }}
                unmountOnExit
            >
                <Fab aria-label="next" className={`${classes.fab} ${classes.previous}`}>
                    <NavigateNextIcon className={classes.rotate} />
                </Fab>
            </Zoom>
            <Zoom
                in={true}
                timeout={1000}
                style={{
                    transitionDelay: `500ms`,
                }}
                unmountOnExit
            >
                <Fab aria-label="next" className={`${classes.fab} ${classes.next}`}>
                    <NavigateNextIcon />
                </Fab>
            </Zoom>
        </div>
    );
};
