import React from 'react';
import { Link } from '../../../../utils/Link';
import { ObjectDeleteButton } from '../../../Buttons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { User, MongoObject, Model, MenuItems } from '../../../../logic/types';

interface Props {
    user: User | null | undefined;
    model: Model;
    _id?: string;
    object: MongoObject;
    anchorEl: HTMLElement | null;
    handleMenuClose: any;
    menuItems: MenuItems;
    removeObject: any;
}

export const CardMenu = ({ user, model, _id, object, anchorEl, handleMenuClose, removeObject, menuItems }: Props) => {
    return (
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {/* TODO: implement action to go to projects page and change state for current project */}
            {menuItems.map((item, i) => (
                <Link key={i} to={item.path || '/'}>
                    <MenuItem
                        key={i}
                        onClick={() => {
                            // item.onClick();
                            handleMenuClose();
                        }}
                    >
                        {item.name}
                    </MenuItem>
                </Link>
            ))}

            {/* Delete button will be visible only if object author is the same as logged in user */}
            <ObjectDeleteButton user={user} model={model} object={object} removeObject={removeObject} />
        </Menu>
    );
};
