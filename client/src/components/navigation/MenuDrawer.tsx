import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TOOLBAR_HEIGHT, DRAWER_WIDTH } from '../../styles/constants';
import { Link } from '../../utils/Link';
import { Drawer, List, ListItem, ListItemText, Divider, Hidden, Typography, Grid } from '@material-ui/core';
import { IconButton } from '../mui-styled/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DrawerVariant, Mode, User } from '../../logic/types';
import { PATHS } from '../../constants/data';
const { home, sprints, projects, teams } = PATHS;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawerHeader: {
            padding: theme.spacing(0, 1),
            minHeight: `${TOOLBAR_HEIGHT * 1.5}px`,
        },
        drawer: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
            transition: 'width 1s',
        },
        drawerPaper: {
            width: DRAWER_WIDTH,
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
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const MenuDrawer = ({ user, variant = 'temporary', mode, setMode, open, toggleDrawer }: Props) => {
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
                    <Typography color="primary" variant="body2">
                        — The —
                    </Typography>
                    <Typography color="primary" variant="body1">
                        BOON
                    </Typography>
                </Grid>
                <IconButton onClick={toggleDrawer(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </Grid>

            {/* <Divider /> */}

            <List>
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
