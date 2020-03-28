import React from 'react';
import { useStyles } from '../../../styles/main';
import List from '@material-ui/core/List';
import SprintListItem from './ListItem';
import Drawer from '@material-ui/core/Drawer';

const SprintListDrawer = ({ sprints, onClick }) => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: `${classes.drawerPaper} ${classes.bgColor}`,
            }}
        >
            <div className={classes.toolbar} />
            <List>
                {[...sprints]
                    .sort((a, b) => b.number - a.number)
                    .map(sprint => (
                        <SprintListItem key={sprint._id} {...sprint} />
                    ))}
            </List>
        </Drawer>
    );
};

export default SprintListDrawer;
