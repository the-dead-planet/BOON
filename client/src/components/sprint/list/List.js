import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SprintListItem from './ListItem';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

const SprintList = ({ sprints, onClick }) => {
    const drawerWidth = 275;

    const useStyles = makeStyles(theme => ({
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
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            {/* <Typography variant="h5" className={classes.offset}>Sprints</Typography> */}
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

export default SprintList;
