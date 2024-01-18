import { makeStyles, createStyles } from '@mui/styles';
import { AppForm } from './App';
import { TextField, Typography, Theme } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { IconButton } from '../mui-styled/IconButton';
import { GridField } from './GridFields';
import { useServices } from '../../services';
import * as Types from '../../logic/types';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

let submitAbortController = new AbortController();

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        submit: {
            display: 'flex',
            marginLeft: 'auto',
        },
    })
);

interface Props {
    _id: string;
    model: Types.Model;
    addComment: (id: string, comment: Types.Comment) => void;
}

export const AddComment = ({ _id, model, addComment }: Props) => {
    const classes = useStyles();
    const { commentsService } = useServices()!;
    const user = Hooks.useSubject(AppState.user$);

    return user ? (
        <AppForm
            initialValues={{ body: '' }}
            onSubmit={(data, { resetForm }) => {
                submitAbortController.abort();
                submitAbortController = new AbortController();
                const extendedData: Types.CommentData & { id: string; objectId: string; model: Types.Model; } = {
                    ...(data as Types.CommentSubmit), // copy form values
                    id: _id, // add sprint id
                    objectId: _id,
                    model: model,
                };

                // TODO: repair warning "Failed prop type: Material-UI: You are providing an onClick event listener to a child of a button element. Firefox will never trigger the event."
                resetForm({ values: {} });

                return commentsService
                    .add(extendedData, submitAbortController.signal)
                    .then((response) => {
                        addComment(_id, response);
                    })
                    .catch((err: Error) => {
                        AppState.notificationHandler.addNotification(err.message ?? `Could not add comment to ${model} ${_id}`)
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
