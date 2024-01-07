import { List } from '@mui/material';
import { Comment } from './Comment';
import { User, Comment as CommentType } from '../logic/types';

interface Props {
    user: User;
    comments: Array<CommentType>;
    users: Map<string, User>;
    onCommentToBeDeletedIdChange: any;
}

export const CommentsList = ({ user, comments, users, onCommentToBeDeletedIdChange }: Props) => {
    return (
        <List>
            {/* <Divider variant="middle" /> */}
            {comments
                ?.sort((a, b) => new Date(b?.created).getTime() - new Date(a?.created).getTime())
                .map((comment, i) => (
                    <Comment
                        key={i}
                        user={user}
                        comment={comment}
                        author={users.get(comment.author)}
                        onCommentToBeDeletedIdChange={onCommentToBeDeletedIdChange}
                    />
                ))}
        </List>
    );
};
