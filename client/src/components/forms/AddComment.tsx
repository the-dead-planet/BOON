import React from 'react';
import { useStyles } from '../../styles/main';
import { AppForm } from './App';
import { GridField } from './GridFields';
import { TextField, Typography, IconButton } from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import commentsService from '../../services/commentsService';
import { Mode, CommentSubmit, User, Model } from '../../logic/types';

interface Props {
    user: User;
    mode: Mode;
    _id: string;
    model: Model;
    addComment: any;
    updatepush: any;
}

export const AddComment = ({ user, mode, _id, model, addComment, updatepush }: Props) => {
    const classes = useStyles();

    return user ? (
        <AppForm
            mode={mode}
            initialValues={{}}
            onSubmit={(data: CommentSubmit, { resetForm }: any) => {
                const extendedData = {
                    ...data, // copy form values
                    id: _id, // add sprint id
                    model: model,
                };

                // TODO: repair warning "Failed prop type: Material-UI: You are providing an onClick event listener to a child of a button element. Firefox will never trigger the event."
                resetForm({ values: '' });

                return commentsService.add(extendedData).then((response) => {
                    addComment(_id, response.data);
                });
            }}
            submitSection={
                <IconButton type="submit" aria-label="add comment" className={classes.submitComment}>
                    <SendOutlinedIcon />
                </IconButton>
            }
            submitPos="right"
            // validationSchema={validationSchema}
        >
            <GridField
                as={TextField}
                required
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                name="body"
                id="add-comment-body"
                placeholder="Express your fabulous opinion"
                xs={10}
            />
        </AppForm>
    ) : (
        <Typography>Log in to express your fabulous opinion</Typography>
    );
};
