import { Link } from '../../utils/Link';
import { ObjectDeleteButton } from '../Buttons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { User, MongoObject, Model, MenuItems, MenuItem as MenuItemType, WithObjectId } from '../../logic/types';

interface Props {
    user: User | null | undefined;
    model: Model;
    object: MongoObject;
    anchorEl: HTMLElement | null;
    handleMenuClose: () => void;
    menuItems: MenuItems;
    removeObject:  (obj: WithObjectId) => void;
}

export const CardMenu = ({ user, model, object, anchorEl, handleMenuClose, removeObject, menuItems }: Props) => {
    return (
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {/* TODO: implement action to go to projects page and change state for current project */}
            {menuItems.map((item: MenuItemType, i: number) => (
                <MenuItem
                    key={i}
                    onClick={() => {
                        // item.onClick();
                        handleMenuClose();
                    }}
                >
                    <Link key={i} to={item.path || '/'}>
                        {item.name}
                    </Link>
                </MenuItem>
            ))}

            {/* Delete button will be visible only if object author is the same as logged in user */}
            <ObjectDeleteButton user={user} model={model} object={object} removeObject={removeObject} />
        </Menu>
    );
};
