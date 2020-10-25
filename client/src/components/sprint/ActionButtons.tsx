import React, { Fragment } from 'react';
import { Link } from '../../utils/Link';
import { Typography } from '@material-ui/core';
import { IconButton } from '../mui-styled/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Comment, Like } from '../../logic/types';

interface Props {
    comments?: Array<Comment | undefined>;
    likes?: Array<Like | undefined>;
    showMorePath?: string;
    handleExpandClick: any;
    toggleCommentsPanel: any;
}

// TODO: Overwrite classes for IconButton to remove the round background color on hover
export const ActionButtons = ({ comments, likes, showMorePath, handleExpandClick, toggleCommentsPanel }: Props) => {
    return (
        <Fragment>
            {likes && (
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon fontSize="small" />

                    <Typography variant="caption">{likes.length}</Typography>
                </IconButton>
            )}
            {/* <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton> */}
            {comments && (
                <IconButton
                    onClick={toggleCommentsPanel(true)}
                    // aria-expanded={expanded}
                    aria-label="show comments"
                >
                    <ModeCommentOutlinedIcon fontSize="small" />

                    <Typography variant="caption">{comments.length}</Typography>
                </IconButton>
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
