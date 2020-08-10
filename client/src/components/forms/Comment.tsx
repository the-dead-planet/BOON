import React from 'react';
import { AppForm } from './App';
import { GridField } from './GridFields';
import { TextField, Typography, Button } from '@material-ui/core';
import commentsService from '../../services/commentsService';
import { Mode, CommentSubmit, User, Model } from '../../logic/types';

interface Props {
    user: User;
    mode: Mode;
    _id: string;
    model: Model;
    updateStateData: any;
    updatepush: any;
}

export const AddComment = ({ user, mode, _id, model, updateStateData, updatepush }: Props) => {
    return user ? (
        <AppForm
            mode={mode}
            initialValues={{}}
            onSubmit={(data: CommentSubmit) => {
                const extendedData = {
                    ...data, // copy form values
                    id: _id, // add sprint id
                    model: model,
                };
                return commentsService.add(extendedData).then(service => {
                    console.log(model, 'comment', service.data);
                    updateStateData(service.data, 'comments', { model: model, _id: _id });
                });
            }}
            submitSection={
                <Button
                    style={{ display: 'flex', marginLeft: 'auto' }}
                    variant={mode === 'dark' ? 'outlined' : 'contained'}
                    color={mode === 'dark' ? undefined : 'primary'}
                    type="submit"
                >
                    Add comment
                </Button>
            }
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
                xs={12}
            />
        </AppForm>
    ) : (
        <Typography>Log in to express your fabulous opinion</Typography>
    );
};
