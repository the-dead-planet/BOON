import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import menuItems from './items';
import { AuthButtonsHorizontal } from './AuthButtons';

const useStyles = makeStyles(theme => ({
    link: {
        color: '#f0e1e7',
        textDecoration: 'none',
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
}));

export const MenuItemsHorizontal = ({ user }) => {
    const classes = useStyles();

    return (
        <div className={classes.nav}>
            <div>
                {menuItems.map((button, index) => (
                    <Button className={classes.link} key={index} color="inherit" href={button.path}>
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
                <ListItem className={classes.link} component={Link} to={item.path} key={item.name}>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText className={classes.link} primary={item.name} />
                </ListItem>
            ))}
        </List>
    );
};
