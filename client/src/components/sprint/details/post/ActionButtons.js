import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';


export const ActionButtons = ({ user, post, handleExpandClick }) => {

    return (
        <React.Fragment>
            <IconButton aria-label="add to favorites">
                <Typography variant="caption">{post.likes.length}</Typography>
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
                <Typography variant="caption">{post.comments.length}</Typography>
            </IconButton>

            {/* TODO: move to the ... menu panel
                <IconButton className={classes.right}>
                    <ObjectDeleteButton user={user} model="Post" object={post} />
                </IconButton> */}
        </React.Fragment>
    );
};
