import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SprintHeader } from './Header';
import { SprintContent } from './Content';
import { Comments } from '../../Comments';
import { SprintModifyButtons } from './ModifyButtons';
import { Box } from '@material-ui/core';
import { CardInnerContent } from './post/CardInnerContent';
import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment';
import { DATE_FORMAT } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#ffcb9a',
    },
    offset: {
        padding: '10px',
    },
    background: {
        backgroundColor: '#ffcb9a',
    },
    media: {
      height: 140,
    },
}));



// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SprintOverview = ({ user, sprint, onError }) => {
    const classes = useStyles();

    const content = sprint ? <CardInnerContent
        user={user}
        model="Sprint"
        object={sprint}
        title={`No${sprint.number} // ${sprint.title}`}
        subtitle={`${sprint.dateFrom ? moment(sprint.dateFrom).format(DATE_FORMAT) : null} - ${sprint.dateTo ? moment(sprint.dateTo).format(DATE_FORMAT) : null}`}
        // mediaTop={<CardMedia className={classes.media} image={sprint.image} />}
        mediaTop={<CardMedia className={classes.media} image={require("../../../img/Landing_1.png")} />}
    /> : null

    return (
        <Box>
            {/* <SprintHeader {...sprint} />
        <SprintContent {...sprint} />
        <SprintModifyButtons user={user} sprint={sprint} model="Sprint" onError={onError} /> */}
            {content}
        </Box>
    );
};
