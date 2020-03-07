import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import commentsService from '../../services/commentsService';
import { AppForm } from './App';
import { GridField } from './GridFields';

const useStyles = makeStyles(theme => ({
    rootForm: {
        '& .MuiTextField-root': {
            // margin: theme.spacing(2),
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

export const AddComment = ({ _id, user, model, push }) => {
    const classes = useStyles();

    return (
        user ? (
            <AppForm
                initialValues={{}}
                onSubmit={data => {
                    const extendedData = {
                        ...data, // copy form values
                        id: _id, // add sprint id
                        model: model,
                    };
                    return commentsService.add(extendedData);
                }}
            >
                <GridField
                    as={TextField}
                    required
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    name="body"
                    id="add-comment-body"
                    placeholder="Express your fabulous opinion"
                    xs={12}
                />
            </AppForm>
        ) : (
                <Typography>Log in to express your fabulous opinion</Typography>
            )
    );
};
