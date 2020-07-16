import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import commentsService from '../../services/commentsService';
import { AppForm } from './App';
import { GridField } from './GridFields';
import { CommentSubmit, User, Model } from '../../logic/types';

interface Props {
    user: User;
    _id: string;
    model: Model;
    updateStateData: any;
    updatepush: any;
}

export const AddComment = ({ user, _id, model, updateStateData, updatepush }: Props) => {
    return user ? (
        <AppForm
            title="Add comment"
            initialValues={{}}
            onSubmit={(data: CommentSubmit) => {
                const extendedData = {
                    ...data, // copy form values
                    id: _id, // add sprint id
                    model: model,
                };
                return commentsService.add(extendedData).then(service => {
                    updateStateData(service.data.comment, 'comments');
                });
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
    );
};
