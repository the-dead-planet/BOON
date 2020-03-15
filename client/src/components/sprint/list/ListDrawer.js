import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SprintListItem from './ListItem';
import Drawer from '@material-ui/core/Drawer';

const SprintListDrawer = ({ sprints, onClick, drawerWidth }) => {
    const useStyles = makeStyles(theme => ({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            backgroundColor: '#950740',
            color: '#f0e1e7',
            width: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
    }));

    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <List>
                {[...sprints]
                    .sort((a, b) => b.number - a.number)
                    .map(sprint => (
                        <SprintListItem {...sprint} key={sprint._id} onClick={() => onClick(sprint._id)} />
                    ))}
            </List>
        </Drawer>
    );
};

export default SprintListDrawer;
