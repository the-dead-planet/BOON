import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from '../../utils/Link';
import { Grid, List, ListItem, ListItemText, Typography, InputBase, Hidden } from '@material-ui/core';
import { TypographyLinkOutlined } from '../mui-styled/Typography';
// import SearchIcon from '@material-ui/icons/Search';
import { IconUserSecret, IconSearch } from '../Icons';
import { ItemMenu } from '../ItemMenu';
import { User } from '../../logic/types';
import { PATHS } from '../../constants/data';
const { login, logout, register } = PATHS;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        disabled: {},
        userIcon: {
            margin: '0 .5em',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        searchInputRoot: {
            color: 'inherit',
        },
        searchInputInput: {
            fontSize: `${theme.typography.body2.fontSize} !important`,
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    })
);

// Set text on auth buttons dependent on whether a user is logged in or not
const getText = (user: User | null | undefined) => {
    return {
        register: !user ? 'Sign up' : `Howdy, ${user.publicName}!`,
        login: !user ? 'Login' : 'Logout',
    };
};

interface Props {
    user: User | null | undefined;
    style?: object;
}

export const AuthButtonsHorizontal = ({ user }: Props) => {
    const classes = useStyles();
    const signUpText = !user ? (
        <TypographyLinkOutlined variant="body2" className={`${user ? classes.disabled : undefined}`} color="inherit">
            {getText(user).register}
        </TypographyLinkOutlined>
    ) : (
        <Typography variant="body2" className={`${user ? classes.disabled : undefined}`} color="inherit">
            {getText(user).register}
        </Typography>
    );

    let signUpButton = !user ? <Link to={register}>{signUpText}</Link> : signUpText;

    // TODO: hide this button, instead open a menu after clicking on the icon with options: "settings, logout etc"
    let loginButton = !user ? (
        <Link to={login}>
            <TypographyLinkOutlined variant="body2" color="secondary">
                {getText(user).login}
            </TypographyLinkOutlined>
        </Link>
    ) : undefined;

    return (
        <Grid container alignItems="center">
            <Hidden smDown>
                {signUpButton}
                {loginButton}
            </Hidden>

            <div className={classes.userIcon}>
                {/* <Link to={!user ? login : account}> */}
                {/* <IconButton color="primary" size="small" aria-label="user menu" style={{ height: 30, width: 30 }}>
                        <IconUserSecret size="1x" />
                    </IconButton> */}
                {/* TODO: Replace with a nice menu with user avatar etc */}
                {user && (
                    <ItemMenu
                        icon={<IconUserSecret size="1x" />}
                        items={[
                            {
                                name: user ? (
                                    <Link to={logout}>
                                        <TypographyLinkOutlined variant="body2" color="secondary">
                                            {getText(user).login}
                                        </TypographyLinkOutlined>
                                    </Link>
                                ) : (
                                    'Login'
                                ),
                                onClick: () => '',
                            },
                        ]}
                        tooltip="User menu"
                    />
                )}
            </div>
        </Grid>
    );
};

export const AuthButtonsVertical = ({ user, style }: Props) => {
    // const classes = useStyles();
    // TODO: resolve error 'div cannot be child of p'
    let signUpButton = (
        <ListItem button component={!user ? Link : Typography} to={!user ? register : ''}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={getText(user).register} />
        </ListItem>
    );

    let loginButton = (
        <ListItem button component={Link} to={!user ? login : logout}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={getText(user).login} />
        </ListItem>
    );

    return (
        <List style={style}>
            {signUpButton}
            {loginButton}
        </List>
    );
};

export const BrowseButton = ({ user, style }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <IconSearch size="1x" />
            </div>
            <InputBase
                placeholder="Browse workspaces..."
                classes={{
                    root: classes.searchInputRoot,
                    input: classes.searchInputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
};
