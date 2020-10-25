import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NAVBAR_LEFT_WIDTH } from '../../styles/constants';
import { NavContent, SideColumn } from '../../logic/types';
import { Typography, Box } from '@material-ui/core';
import { LinkComponent } from '../../utils/Link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sideCol: {
            position: 'absolute',
            width: `${NAVBAR_LEFT_WIDTH}px`,
            [theme.breakpoints.down('sm')]: {
                display: 'none',
                visibility: 'hidden',
            },
        },
        navContainer: {
            padding: 0,
            width: '100%',
            border: `solid 2px ${theme.palette.primary.main}`,
            // borderTopWidth: "20px"
        },
        navTitle: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.default,
            padding: '.2em',
            textAlign: 'center',
            textTransform: 'uppercase',
        },
        panelButton: {
            padding: '.2em .8em',
            // transition: "background-color .6s ease-out, color .1s ease-out",
            '&:hover': {
                // backgroundColor: theme.palette.primary.light,
                // color: theme.palette.primary.contrastText,
                backgroundColor: 'rgba(0, 0, 0, .06)',
                // transition: "background-color .6s ease-out, color .1s ease-out",
            },
            '&:active': {
                // backgroundColor: theme.palette.primary.main,
                // color: theme.palette.primary.contrastText,
                backgroundColor: 'rgba(0, 0, 0, .1)',
                // transition: "background-color .1s ease-out, color .6s ease-out",
            },
        },
        selected: {
            backgroundColor: 'rgba(0, 0, 0, .03)',
            fontStyle: 'italic',
        },
        gossColContainer: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            padding: '.4em',
            position: 'relative',
            '&::after': {
                content: "''",
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                border: `solid 2px ${theme.palette.primary.main}`,
            },
        },
        gossColTitle: {
            padding: theme.spacing(1.5, 0),
            textAlign: 'center',
            textTransform: 'uppercase',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
        },
    })
);

interface NavBarLeftProps {
    contents: NavContent;
    sideColumn?: SideColumn;
}

// A temporary component that is going to be implemented in Layout in the long run.
const NavBarLeft = ({ contents, sideColumn }: NavBarLeftProps) => {
    const classes = useStyles();

    return (
        <Box className={classes.sideCol}>
            {/* Main navigation panel */}
            <Box className={classes.navContainer}>
                {contents.map((content, index) => (
                    <Box key={index}>
                        <Typography variant="body2" className={classes.navTitle}>
                            {content.header}
                        </Typography>

                        {content.list.map((item, i) => (
                            <LinkComponent key={i} hash={item.hash || false} to={item.path}>
                                <Typography
                                    variant="body2"
                                    className={`${classes.panelButton} ${
                                        item.id === content.activeId ? classes.selected : undefined
                                    }`}
                                >
                                    {item.name}
                                </Typography>
                            </LinkComponent>
                        ))}
                    </Box>
                ))}
            </Box>

            {/* Additional / optional column under the navigation panel */}
            {sideColumn && (
                <Box className={classes.gossColContainer}>
                    <Typography variant="h5" className={classes.gossColTitle}>
                        {sideColumn.header}
                    </Typography>
                    <Typography variant="body2">{sideColumn.body}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default NavBarLeft;
