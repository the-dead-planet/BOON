import React from 'react';
import { ObjectDeleteButton } from '../../../Buttons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export const CardMenu = ({ user, model, object, anchorEl, handleMenuClose }) => {

    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            {/* TODO: implement action to go to projects page and change state for current project */}
            <MenuItem onClick={handleMenuClose}>Go to related project</MenuItem>
            <ObjectDeleteButton user={user} model={model} object={object} />
        </Menu>
    );
};
