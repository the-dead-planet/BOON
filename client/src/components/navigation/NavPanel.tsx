import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NAVBAR_LEFT_WIDTH } from '../../styles/constants';
import { LinkComponent } from '../../utils/Link';
import { Typography, Box } from '@material-ui/core';
import { NavContent, SideColumn, User, NavButton, Variant } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sideCol: {
            // position: 'absolute',
            minWidth: `${NAVBAR_LEFT_WIDTH}px`,
            maxWidth: `${NAVBAR_LEFT_WIDTH}px`,
            [theme.breakpoints.only('xs')]: {
                minWidth: '100%',
                maxWidth: '100%',
            },
        },
        navContainer: ({ variant }: { variant: Variant }) => ({
            padding: 0,
            width: '100%',
            border: `solid 1.5px ${variant === 'secondary' ? theme.palette.primary.main : theme.palette.primary.main}`,
            // borderTopWidth: "20px"
        }),
        navButton: {
            marginBottom: theme.spacing(1),
            padding: theme.spacing(1.5),
            border: `solid 4px ${theme.palette.secondary.main}`,
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                cursor: 'pointer',
                boxShadow: `4px 4px ${theme.palette.secondary.dark}`,
            },
            '&:active': {
                backgroundColor: theme.palette.secondary.dark,
                borderColor: theme.palette.secondary.dark,
                boxShadow: `4px 4px ${theme.palette.primary.main}`,
            },
        },
        navTitle: ({ variant }: { variant: Variant }) => ({
            backgroundColor: variant === 'secondary' ? theme.palette.primary.main : theme.palette.primary.main,
            color: theme.palette.background.default,
            padding: '.2em',
            textAlign: 'center',
            textTransform: 'uppercase',
        }),
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
        selected: ({ variant }: { variant: Variant }) => ({
            // backgroundColor: variant === "secondary" ? theme.palette.secondary.light : theme.palette.primary.light,
            // color: theme.palette.background.default,
            // fontStyle: 'italic',
            // textAlign: 'right',
            textTransform: 'uppercase',
        }),
        sideColContainer: {
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
                border: `solid 1.5px ${theme.palette.primary.main}`,
            },
        },
        sideColTitle: {
            padding: theme.spacing(1.5, 0),
            textAlign: 'center',
            textTransform: 'uppercase',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
        },
        sideColBody: {
            padding: theme.spacing(1),
            textAlign: 'center',
            // textAlign: "justify",
        },
    })
);

interface Props {
    user: User;
    variant?: Variant;
    contents: NavContent;
    sideColumn?: SideColumn;
    createButton?: NavButton;
}

// A temporary component that is going to be implemented in Layout in the long run.
export const NavPanel = ({ user, variant, contents, sideColumn, createButton }: Props) => {
    const classes = useStyles({ variant });

    return (
        <Box className={classes.sideCol}>
            {/* Create button - to be displayed only if user has sufficient auth => admin or editor */}
            {/* TODO: Create a separate component which specifies components which require certain authorization */}
            {/* And include those in tests */}
            {createButton && user && ['admin', 'editor'].includes(user.role) ? (
                <Typography
                    variant="body1"
                    color="secondary"
                    className={classes.navButton}
                    onClick={createButton.onClick}
                >
                    {createButton.name}
                </Typography>
            ) : undefined}

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
                                    // color={variant}
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
        </Box>
    );
};

interface SideColProps {
    variant?: Variant;
    header: string;
    body: string;
}

export const SideCol = ({ variant, header, body }: SideColProps) => {
    const classes = useStyles({ variant });

    return (
        <Box className={classes.sideCol}>
            <Box className={classes.sideColContainer}>
                <Typography variant="h5" className={classes.sideColTitle}>
                    {header}
                </Typography>
                <Typography variant="body2" className={classes.sideColBody}>
                    {body}
                </Typography>
            </Box>
        </Box>
    );
};
