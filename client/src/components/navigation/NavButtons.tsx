import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Grid, List, ListItem, ListItemText, Typography, InputBase, Hidden } from '@material-ui/core';
import { TypographyLink } from '../mui-styled/Typography';
import { ItemMenu } from '../ItemMenu';
import SearchIcon from '@material-ui/icons/Search';
import { IconUserSecret } from '../Icons';
import { User } from '../../logic/types';
import { PATHS } from '../../constants/data';
const { login, logout, register } = PATHS;

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
    const signUpText = (
        <Typography variant="body2" className={`${user ? classes.disabled : undefined}`} color="inherit">
            {getText(user).register}
        </Typography>
    );

    let signUpButton = !user ? <Link to={register}>{signUpText}</Link> : signUpText;

    // TODO: hide this button, instead open a menu after clicking on the icon with options: "settings, logout etc"
    let loginButton = !user ? (
        <Link to={login}>
            <Typography variant="body2" color="secondary">
                {getText(user).login}
            </Typography>
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
                                        <TypographyLink variant="body2" color="secondary">
                                            {getText(user).login}
                                        </TypographyLink>
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
    const classes = useStyles();
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
                <SearchIcon />
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
