import React, { useState } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from '../../utils/Link';
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
    InputBase,
    Hidden,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import { TypographyLinkOutlined } from '../mui-styled/Typography';
// import { Button } from '../mui-styled/Button';
import DialogMenu from './DialogMenu';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { IconUserSecret, IconSearch } from '../Icons';
import { ItemMenu } from '../ItemMenu';
import { ThemeType, Mode, User } from '../../logic/types';
import { PATHS } from '../../constants/data';
const { login, logout, register } = PATHS;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        disabled: {},
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
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
            fontSize: `${theme.typography.body2.fontSize}`,
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        auth: {
            [theme.breakpoints.up('sm')]: {
                marginRight: theme.spacing(3),
            },
        },
        spacing: {
            marginLeft: theme.spacing(2),
        },
        preferences: {
            width: '100%',
            padding: '1em',
        },
        itemName: {
            minWidth: '5em',
            width: '40%',
        },
        radioGroup: {
            [theme.breakpoints.up('md')]: {
                display: 'inline',
            },
        },
    })
);

// Set text on auth buttons dependent on whether a user is logged in or not
const texts = {
    register: 'Sign up',
    login: 'Login',
    logout: 'Log out',
};

interface Props {
    user: User | null | undefined;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
}

export const AuthButtonsHorizontal = ({ user, themeType, setThemeType, mode, setMode }: Props) => {
    const classes = useStyles();
    const signUpButton = (
        <Link to={register}>
            <TypographyLinkOutlined
                variant="body2"
                className={`${user ? classes.disabled : undefined}`}
                color="inherit"
            >
                {texts.register}
            </TypographyLinkOutlined>
        </Link>
    );

    let logInButton = (
        <Link to={login}>
            <TypographyLinkOutlined variant="body2" color="secondary">
                {texts.login}
            </TypographyLinkOutlined>
        </Link>
    );

    // Dialog with settings
    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDialogOpen = (id: string) => {
        setOpenDialog(true);
    };

    const [themeTypeValue, setThemeTypeValue] = React.useState(themeType);
    const [modeValue, setModeValue] = React.useState(mode);

    const handleThemeTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val: ThemeType = (event.target as HTMLInputElement).value as ThemeType;
        setThemeTypeValue(val);
        setThemeType(val);
    };
    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value as Mode;
        setModeValue(val);
        setMode(val);
    };

    const themeTypes: Array<ThemeType> = ['default', 'vintage', 'frostic'];
    const modes: Array<Mode> = ['light', 'dark'];

    const preferences = (
        <List className={classes.preferences}>
            <ListItem>
                <Typography className={classes.itemName}>Theme</Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="mode"
                        name="mode"
                        value={themeTypeValue}
                        onChange={handleThemeTypeChange}
                        className={classes.radioGroup}
                    >
                        {themeTypes.map((t: ThemeType) => (
                            <FormControlLabel value={t} control={<Radio />} label={t} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </ListItem>

            <ListItem>
                <Typography className={classes.itemName}>Mode</Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="mode"
                        name="mode"
                        value={modeValue}
                        onChange={handleModeChange}
                        className={classes.radioGroup}
                    >
                        {modes.map((m: Mode) => (
                            <FormControlLabel value={m} control={<Radio />} label={m} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </ListItem>
        </List>
    );

    return (
        <Grid container alignItems="center" className={classes.auth}>
            {/* Display 'sign up' and 'log in' buttons only if user not logged in */}
            {!user && (
                <Hidden smDown>
                    {signUpButton}
                    {logInButton}
                </Hidden>
            )}

            {/* If user logged in, show icon which expands a menu with user settings and log out button */}
            {user && (
                <>
                    {/* Current workspace */}
                    <ItemMenu
                        icon={<GroupWorkIcon />}
                        items={[
                            { name: 'Space Cadets', onClick: () => '' },
                            { name: 'Preferences', onClick: handleDialogOpen },
                            { name: 'Change workspace', onClick: () => '' },
                            { name: 'Leave', onClick: () => '', alarm: true },
                        ]}
                        tooltip="Workspace menu"
                        placement="bottom-end"
                    />
                    {/* User menu */}
                    <ItemMenu
                        icon={<IconUserSecret size="1x" />}
                        items={[
                            { name: `Howdy, ${user.publicName}!`, onClick: () => '' },
                            { name: 'Account', onClick: () => '' },
                            { name: texts.logout, path: logout, onClick: () => '', alarm: true },
                        ]}
                        tooltip="User menu"
                        placement="bottom-end"
                    />
                </>
            )}

            {/* Dialog for delete comment alert */}
            <DialogMenu
                open={openDialog}
                message="Preferences"
                content={preferences}
                handleClose={handleDialogClose}
                buttonOk={{ text: 'Done', onClick: handleDialogClose }}
                fullScreenBreakPoint="sm"
            />
        </Grid>
    );
};

export const AuthButtonsVertical = ({ user }: Props) => {
    // const classes = useStyles();
    // TODO: resolve error 'div cannot be child of p'
    let signUpButton = (
        <ListItem button component={!user ? Link : Typography} to={!user ? register : ''}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={texts.register} />
        </ListItem>
    );

    let loginButton = (
        <ListItem button component={Link} to={!user ? login : logout}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={texts.login} />
        </ListItem>
    );

    return (
        <List>
            {signUpButton}
            {loginButton}
        </List>
    );
};

export const BrowseButton = ({ user }: Props) => {
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
