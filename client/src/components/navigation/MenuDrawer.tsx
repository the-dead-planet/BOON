import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { TOOLBAR_HEIGHT, DRAWER_WIDTH } from '../../styles/constants';
import { Link } from '../../utils/Link';
import { Drawer, List, ListItem, ListItemText, Typography, Grid, Theme } from '@mui/material';
import { IconButton } from '../mui-styled/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as Routes from '../../routes';
import * as Types from '../../logic/types';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawerHeader: {
            padding: theme.spacing(0, 1),
            minHeight: `${TOOLBAR_HEIGHT * 2}px`,
        },
        drawer: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
            transition: 'width 1s',
        },
        drawerPaper: {
            width: DRAWER_WIDTH,
        },
        actionButton: {
            border: `solid 2px ${theme.palette.secondary.main}`,
            borderWidth: '1px 0 1px 0',
            '&:hover': {
                backgroundColor: 'rgba(206, 66, 87, .04)',
            },
        },
    })
);

interface Props {
    open: boolean;
    toggleDrawer: (value: boolean) => () => void;
    variant?: Types.DrawerVariant;
    createButton?: Types.NavButton;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const MenuDrawer: React.FC<Props> = ({ variant = 'temporary', open, toggleDrawer, createButton }) => {
    const classes = useStyles();
    const user = Hooks.useSubject(AppState.user$);

    const items = [
        {
            name: 'Home',
            path: Routes.Types.RouterPaths.Home,
        },
        {
            name: 'Sprints',
            path: Routes.Types.RouterPaths.Sprints,
        },
        {
            name: 'Projects',
            path: Routes.Types.RouterPaths.Projects,
        },
        {
            name: 'Teams',
            path: Routes.Types.RouterPaths.Teams,
        },
    ];

    return (
        <Drawer
            className={classes.drawer}
            variant={variant}
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Grid container className={classes.drawerHeader} justifyContent="flex-end">
                <Grid container item xs={12} direction="column" justifyContent="center" alignItems="center">
                    <Typography variant="body2">— The —</Typography>
                    <Typography variant="body1">BOON</Typography>
                </Grid>
                <IconButton onClick={toggleDrawer(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </Grid>

            <List>
                {createButton && user && ['admin', 'editor'].includes(user.role) ? (
                    <Link to={createButton?.path || '/'}>
                        <ListItem button className={classes.actionButton}>
                            <Typography color="secondary">{createButton.name}</Typography>
                        </ListItem>
                    </Link>
                ) : undefined}

                {items.map((item, i) => (
                    <Link key={i} to={item.path}>
                        <ListItem button>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>

            {/* <Divider /> */}
            {/* TODO: Add mode modes and change this component to another one */}
            {/* <DarkModeSwitch mode={mode} onModeChange={onModeChange} /> */}
        </Drawer>
    );
};

export default MenuDrawer;
