import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Button, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { menuItems } from './items';
import { AuthButtonsHorizontal } from './AuthButtons';
import { User } from '../../logic/types';

interface Props {
    user: User;
}

export const MenuItemsHorizontal = ({ user }: Props) => {
    const classes = useStyles();

    return (
        <Grid container justify="space-between">
            <Grid item>
                {menuItems.map((button, index) => (
                    <Button key={index} color="inherit" href={button.path}>
                        {button.name}
                    </Button>
                ))}
            </Grid>
            <Grid item>
                <AuthButtonsHorizontal user={user} />
            </Grid>
        </Grid>
    );
};

export const MenuItemsVertical = ({ user }: Props) => {
    const classes = useStyles();

    return (
        <List>
            {menuItems.map(item => (
                <ListItem button component={Link} to={item.path} key={item.name}>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
        </List>
    );
};
