import React from 'react';
import { ObjectDeleteButton } from '../../../Buttons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const CardMenu = ({ user, model, _id, object, anchorEl, handleMenuClose, menuItems }) => {
    return (
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {/* TODO: implement action to go to projects page and change state for current project */}
            {menuItems.map((item, i) => (
                <MenuItem key={i} onClick={handleMenuClose}>
                    {item.name}
                </MenuItem>
            ))}
            <ObjectDeleteButton user={user} model={model} object={object} />
        </Menu>
    );
};
