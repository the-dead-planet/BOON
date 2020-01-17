import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui'; // Use the formik-ready variants of form fields.
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import commentsService from '../../services/commentsService';
import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../utils/routingDecorators';

const useStyles = makeStyles(theme => ({
    rootForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '100%',
            margin: '0 auto',
        },
    },
    root: {
        padding: theme.spacing(3, 2),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    offset: {
        padding: '20px',
    },
}));

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SprintDetails = ({
    _id,
    number,
    name,
    dateFrom,
    dateTo,
    description,
    posts,
    comments,
    likes,
    author,
    created,
    push,
}) => {
    const classes = useStyles();

    return (
        <Paper className={`${classes.paper} ${classes.offset}`}>
            <Box>
                <Box id={'header'} textAlign="left">
                    <Typography variant="h2">
                        {number} : {name}
                    </Typography>
                </Box>
                <Box id={'content'} textAlign="left">
                    <Typography variant="body1">
                        {dateFrom ? dateFrom.substring(0, 10) : ''} - {dateTo ? dateTo.substring(0, 10) : ''}
                    </Typography>
                    <Typography variant="body2">{description}</Typography>
                </Box>

                <Box id={'posts'}>{(posts || []).map(post => 'TODO')}</Box>
                <Box id={'comments'}>
                    {(comments || []).map(comment => 'TODO')}

                    <Formik
                        initialValues={{}}
                        onSubmit={data =>
                            commentsService.add(data).then(() => {
                                push('/comments');
                            })
                        }
                    >
                        <Form className={classes.rootForm} noValidate autoComplete="off">
                            <Field
                                name="comment"
                                multiline
                                rows="3"
                                placeholder={`Add Comment ${_id}`}
                                variant="outlined"
                                component={FormikTextField}
                            />
                            <p>
                                <button type="submit">Submit</button>
                            </p>
                        </Form>
                    </Formik>
                </Box>
            </Box>
        </Paper>
    );
};
