import React, { Fragment } from 'react';
import { Link } from '../../utils/Link';
import { Typography, Tooltip } from '@mui/material';
import { IconButton } from '../mui-styled/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Comment, Like } from '../../logic/types';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

interface Props {
    author: string;
    comments?: Array<Comment | undefined>;
    likes?: Array<Like | undefined>;
    showMorePath?: string;
    toggleCommentsPanel: (toggle: boolean) => void;
}

export const ActionButtons: React.FC<Props> = ({ author, comments, likes, showMorePath, toggleCommentsPanel }) => {
    const user = Hooks.useSubject(AppState.user$);
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
                        onClick={() => toggleCommentsPanel(true)}
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
