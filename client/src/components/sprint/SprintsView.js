import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SprintListDrawer from './list/ListDrawer';
import { SingleSprint } from './details/SingleSprint';
import { Loading, Empty } from '../Loading';
import sprintsService from '../../services/sprintsService';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
        height: '100%',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            marginLeft: `${drawerWidth}px`,
        },
    },
}));

const SprintsView = ({ user, onClick, sprintId, initializeSprint, onError }) => {
    const classes = useStyles();

    const [sprints, setSprints] = useState(null);

    const getSprints = async () => {
        // TODO: store `sprints` in `App.js`, pass by props
        let res = await sprintsService.getAll().catch(onError);
        setSprints(res);
        initializeSprint(res);
    };

    useEffect(() => {
        if (!sprints) {
            getSprints();
        }
    });

    return !sprints ? (
        <Loading />
    ) : sprints.length === 0 ? (
        <Empty />
    ) : (
        <React.Fragment>
            <Hidden xsDown>
                <SprintListDrawer drawerWidth={drawerWidth} sprints={sprints} onClick={onClick} />
            </Hidden>

            <main className={classes.content}>
                <SingleSprint
                    user={user}
                    sprint={sprints.filter(sprint => sprint._id === sprintId)[0]}
                    onError={onError}
                />
            </main>
        </React.Fragment>
    );
};

export default SprintsView;
