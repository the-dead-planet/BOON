import { makeStyles, createStyles } from '@mui/styles';
import { AppForm } from './App';
import { TextField, Typography, Theme } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { IconButton } from '../mui-styled/IconButton';
import { GridField } from './GridFields';
import { Mode, CommentSubmit, User, Model, Comment, CommentData } from '../../logic/types';
import { useServices } from '../../services';

const useStyles = makeStyles((_theme: Theme) =>
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
    addComment: (id: string, comment: Comment) => void;
}

export const AddComment = ({ user, mode, _id, model, addComment }: Props) => {
    const classes = useStyles();
    const { commentsService } = useServices()!;

    return user ? (
        <AppForm
            mode={mode}
            initialValues={{ body: '' }}
            onSubmit={(data, { resetForm }) => {
                const extendedData: CommentData & { id: string; objectId: string; model: Model; } = {
                    ...(data as CommentSubmit), // copy form values
                    id: _id, // add sprint id
                    objectId: _id,
                    model: model,
                };

                // TODO: repair warning "Failed prop type: Material-UI: You are providing an onClick event listener to a child of a button element. Firefox will never trigger the event."
                resetForm({ values: {} });

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
