import React from 'react';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { TextField, Typography } from '@material-ui/core';
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
    // TODO: Write validation schema
    // const validationSchema = (values: any) => undefined;
    // Yup.object().shape({
    //     email: Yup.string()
    //         .email()
    //         .required('Required'),
    //     password: Yup.string()
    //         .required('No password provided.')
    //         .min(8, 'Password is too short - should be 8 chars minimum.')
    //         .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
    // });

    return user ? (
        <AppFormLayout title="Add comment">
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
                        updateStateData(service.data.comment, 'comments');
                    });
                }}
                // validationSchema={validationSchema}
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
        </AppFormLayout>
    ) : (
        <Typography>Log in to express your fabulous opinion</Typography>
    );
};
