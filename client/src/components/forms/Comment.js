import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import commentsService from '../../services/commentsService';
import { AppForm } from './App';
import { GridField } from './GridFields';


export const AddComment = ({ _id, user, model, push }) => {

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
