import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import { User, Comment, Like } from '../../../../logic/types';

interface Props {
    comments: Array<Comment | undefined>;
    likes: Array<Like | undefined>;
    handleExpandClick: any;
    toggleCommentsPanel: any;
}

export const ActionButtons = ({ comments, likes, handleExpandClick, toggleCommentsPanel }: Props) => {
    return (
        <Fragment>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />

                <Typography variant="caption">{likes.length}</Typography>
            </IconButton>
            {/* <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton> */}
            <IconButton
                onClick={toggleCommentsPanel(true)} // TODO: pass object id to get the list of comments
                // aria-expanded={expanded}
                // aria-label="show more"
            >
                <ModeCommentOutlinedIcon />
                <Typography variant="caption">{comments.length}</Typography>
            </IconButton>
        </Fragment>
    );
};
