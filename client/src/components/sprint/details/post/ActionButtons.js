import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';

export const ActionButtons = ({ user, comments, likes, handleExpandClick }) => {
    return (
        <React.Fragment>
            <IconButton aria-label="add to favorites">
                <Typography variant="caption">{likes.length}</Typography>
                <FavoriteIcon />
            </IconButton>
            {/* <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton> */}
            <IconButton
                onClick={handleExpandClick}
                // aria-expanded={expanded}
                // aria-label="show more"
            >
                <ModeCommentOutlinedIcon />
                <Typography variant="caption">{comments.length}</Typography>
            </IconButton>
        </React.Fragment>
    );
};
