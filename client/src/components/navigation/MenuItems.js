import React from 'react';
import { useStyles } from '../../styles/main';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import menuItems from './items';
import { AuthButtonsHorizontal } from './AuthButtons';

export const MenuItemsHorizontal = ({ user }) => {
    const classes = useStyles();

    return (
        <div className={classes.flexSpaceBetween}>
            <div>
                {menuItems.map((button, index) => (
                    <Button key={index} color="inherit" href={button.path}>
                        {button.name}
                    </Button>
                ))}
            </div>
            <div>
                <AuthButtonsHorizontal user={user} />
            </div>
        </div>
    );
};

export const MenuItemsVertical = ({ user }) => {
    const classes = useStyles();

    return (
        <List>
            {menuItems.map(item => (
                <ListItem component={Link} to={item.path} key={item.name}>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText className={classes.textColorLight} primary={item.name} />
                </ListItem>
            ))}
        </List>
    );
};
