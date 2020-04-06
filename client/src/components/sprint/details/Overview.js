import React from 'react';
import { useStyles } from '../../../styles/main';
import { Box } from '@material-ui/core';
import { PostCard } from './post/Card';
import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment';
import { DATE_FORMAT } from '../../../utils/constants';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SprintOverview = ({ user, sprint, comments, likes, onError }) => {
    const classes = useStyles();

    const content = sprint ? (
        // TODO: Create a sprint card
        <PostCard
            user={user}
            object={sprint}
            model="Sprint" // TODO: figure out a better way - this is used in object delete button to choose the right service
            comments={comments}
            likes={likes}
            title={`No${sprint.number} // ${sprint.title}`}
            // subtitle={`${sprint.author.publicName} // ${ // TODO: get all authors and filter
            subtitle={`${sprint.number} // ${sprint.dateFrom ? moment(sprint.dateFrom).format(DATE_FORMAT) : null} - ${
                sprint.dateTo ? moment(sprint.dateTo).format(DATE_FORMAT) : null
            }`}
            body={sprint.body}
            // mediaTop={<CardMedia className={classes.height200} image={sprint.image} />}
            mediaTop={<CardMedia className={classes.height200} image={require('../../../img/Landing_1.png')} />}
            menuItems={[{ name: 'Cos tu wymyslimy' }]}
        />
    ) : null;

    return (
        <Box>
            {/* <SprintHeader {...sprint} />
        <SprintContent {...sprint} />
        <SprintModifyButtons user={user} sprint={sprint} model="Sprint" onError={onError} /> */}
            {content}
        </Box>
    );
};
