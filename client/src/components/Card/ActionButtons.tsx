import React, { Fragment } from 'react';
import { Link } from '../../utils/Link';
import { Typography, Tooltip } from '@material-ui/core';
import { IconButton } from '../mui-styled/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Comment, Like, User } from '../../logic/types';

interface Props {
    user: User;
    author: string;
    comments?: Array<Comment | undefined>;
    likes?: Array<Like | undefined>;
    showMorePath?: string;
    toggleCommentsPanel: any;
}

export const ActionButtons = ({ user, author, comments, likes, showMorePath, toggleCommentsPanel }: Props) => {
    // TODO: Below is a placeholder, this boolean should check if user already gave this object a like.
    // Based on that display the right icon and tooltip
    const isLiked = author === user?._id;

    return (
        <Fragment>
            {likes && (
                <Tooltip title={isLiked ? 'Take the like back' : 'Give a like'}>
                    <IconButton aria-label="add to favorites">
                        {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}

                        <Typography variant="caption">{likes.length}</Typography>
                    </IconButton>
                </Tooltip>
            )}
            {comments && (
                <Tooltip title="Show comments">
                    <IconButton
                        onClick={toggleCommentsPanel(true)}
                        // aria-expanded={expanded}
                        aria-label="show comments"
                    >
                        <ModeCommentOutlinedIcon fontSize="small" />

                        <Typography variant="caption">{comments.length}</Typography>
                    </IconButton>
                </Tooltip>
            )}

            {showMorePath && (
                <Link to={showMorePath}>
                    <IconButton
                        // onClick={toggleCommentsPanel(true)}
                        // aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ArrowRightAltIcon fontSize="small" />
                    </IconButton>
                </Link>
            )}
        </Fragment>
    );
};
