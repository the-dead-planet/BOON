import React from 'react';
import { useStyles } from '../../styles/main';
import List from '@material-ui/core/List';
import DrawerListItem from './DrawerListItem';
import Drawer from '@material-ui/core/Drawer';
import { Sprint } from '../../logic/types';

interface Props {
    sprints: Map<string, Sprint>;
    currentSprintId: string;
}

const DrawerSprintList = ({ sprints, currentSprintId }: Props) => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            // classes={{
            //     paper: classes.drawerPaper,
            // }}
        >
            {/* <div className={classes.toolbar} /> */}
            <List>
                {/* TODO: sort a map, remove _id from values */}
                {[...sprints.values()]
                    .sort((a, b) => b.number - a.number)
                    .map((sprint) => (
                        <DrawerListItem key={sprint.title} currentSprintId={currentSprintId} {...sprint} />
                    ))}
            </List>
        </Drawer>
    );
};

export default DrawerSprintList;
