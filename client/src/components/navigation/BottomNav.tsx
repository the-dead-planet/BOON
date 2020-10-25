import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Zoom, Fab } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { User } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            // position: 'relative',
            '&$next': {
                right: theme.spacing(4),
                position: 'absolute',
            },
            '&$previous': {
                position: 'absolute',
                left: theme.spacing(2),
            },
        },
        next: {},
        previous: {},
        fabContainer: {
            position: 'fixed',
            left: 0,
            right: 0,
            width: '100vw',
            top: `calc(100vh - 70px)`,
        },
        rotate: {
            transform: 'rotate(180deg)',
        },
        zoom: {
            transitionDelay: `500ms`,
        },
    })
);

interface Props {
    user: User;
}

export const BottomNav = ({ user }: Props) => {
    const classes = useStyles();
    const zoomStyle = { transitionDelay: `500ms` };
    return (
        <div className={classes.fabContainer}>
            <Zoom in={true} timeout={1000} unmountOnExit style={zoomStyle}>
                <Fab aria-label="next" className={`${classes.fab} ${classes.previous}`}>
                    <NavigateNextIcon className={classes.rotate} />
                </Fab>
            </Zoom>
            <Zoom in={true} timeout={1000} style={zoomStyle} unmountOnExit>
                <Fab aria-label="next" className={`${classes.fab} ${classes.next}`}>
                    <NavigateNextIcon />
                </Fab>
            </Zoom>
        </div>
    );
};
