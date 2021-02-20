import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TOOLBAR_HEIGHT, DRAWER_WIDTH } from '../../styles/constants';
import { Link } from '../../utils/Link';
import { Drawer, List, ListItem, ListItemText, Typography, Grid } from '@material-ui/core';
import { IconButton } from '../mui-styled/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DrawerVariant, Mode, NavButton, User } from '../../logic/types';
import { PATHS } from '../../constants/data';
const { home, sprints, projects, teams } = PATHS;

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
    user: User;
    mode: Mode;
    setMode: any;
    open: boolean;
    toggleDrawer: any;
    variant?: DrawerVariant;
    createButton?: NavButton;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const MenuDrawer = ({ user, variant = 'temporary', mode, setMode, open, toggleDrawer, createButton }: Props) => {
    const classes = useStyles();

    const items = [
        {
            name: 'Home',
            path: home,
        },
        {
            name: 'Sprints',
            path: sprints,
        },
        {
            name: 'Projects',
            path: projects,
        },
        {
            name: 'Teams',
            path: teams,
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
            <Grid container className={classes.drawerHeader} justify="flex-end">
                <Grid container item xs={12} direction="column" justify="center" alignItems="center">
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
            {/* <DarkModeSwitch mode={mode} setMode={setMode} /> */}
        </Drawer>
    );
};

export default MenuDrawer;
