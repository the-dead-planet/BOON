import { List } from '@mui/material';
import { Comment } from './Comment';
import * as Types from '../logic/types';

interface Props {
    comments: Array<Types.Comment>;
    users: Map<string, Types.User>;
    onCommentToBeDeletedIdChange: (id: string) => void;
}

export const CommentsList = ({ comments, users, onCommentToBeDeletedIdChange }: Props) => {
    return (
        <List>
            {/* <Divider variant="middle" /> */}
            {comments
                ?.sort((a, b) => new Date(b?.created).getTime() - new Date(a?.created).getTime())
                .map((comment, i) => (
                    <Comment
                        key={i}
                        comment={comment}
                        author={users.get(comment.author)}
                        onCommentToBeDeletedIdChange={onCommentToBeDeletedIdChange}
                    />
                ))}
        </List>
    );
};
