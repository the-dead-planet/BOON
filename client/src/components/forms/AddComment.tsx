import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AppForm } from './App';
import { TextField, Typography } from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { IconButton } from '../mui-styled/IconButton';
import { GridField } from './GridFields';
import { Mode, CommentSubmit, User, Model } from '../../logic/types';
import { useServices } from '../../services';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submit: {
            display: 'flex',
            marginLeft: 'auto',
        },
    })
);

interface Props {
    user: User;
    mode: Mode;
    _id: string;
    model: Model;
    addComment: any;
}

export const AddComment = ({ user, mode, _id, model, addComment }: Props) => {
    const classes = useStyles();
    const { commentsService } = useServices()!;

    return user ? (
        <AppForm
            mode={mode}
            initialValues={{}}
            onSubmit={(data: CommentSubmit, { resetForm }: any) => {
                const extendedData = {
                    ...data, // copy form values
                    id: _id, // add sprint id
                    objectId: _id,
                    model: model,
                };

                // TODO: repair warning "Failed prop type: Material-UI: You are providing an onClick event listener to a child of a button element. Firefox will never trigger the event."
                resetForm({ values: '' });

                return commentsService.add(extendedData).then((response) => {
                    addComment(_id, response);
                });
            }}
            submitSection={
                <IconButton type="submit" aria-label="add comment" className={classes.submit}>
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
