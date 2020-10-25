/* 
    The purpose of this file is to integrate all styles in one place and reuse classes in various components
*/
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const header = require('../img/landing/header-1.jpg');
const header2 = require('../img/landing/header-2.jpg');

// Misc const used in styles
const drawerWidth = 240;
const drawerSecondaryWidth = 400;
const navBarLeftWidth = 200;
const toolbarHeight = 40;
const jumbotronHeight = '100vh';

// TODO: See ways to procedurally generate a vintage newspaper background
// See http://api.thumbr.it/whitenoise-361x370.png?background=f2e8d5ff&noise=626262&density=15&opacity=15
// And https://codepen.io/AgnusDei/pen/NWPbOxL
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        /* 
            Containers
        */
        /* 
            Images
        */

        /* 
            NavBar
        */
        menuButton: {
            marginRight: theme.spacing(2),
        },

        // Misc
        noDecoration: {
            textDecoration: 'none',
            color: 'inherit',
        },
        left: {},
        right: {},
        flexRight: {
            marginLeft: 'auto !important',
        },
        flexLeft: {
            marginRight: 'auto',
        },
        navButton: {
            padding: '.2em .8em',
            transition: 'transform .2s ease-in',
            '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform .2s ease-out',
                // textShadow: '1px 1px 2px rgba(0, 0, 0, .03)',
                // borderRadius: '5px',
            },
            '&$disabled': {
                pointerEvents: 'none',
            },
        },
        disabled: {},
        button: {
            margin: '0 .4em !important',
            padding: '.2em 1em !important',
            borderWidth: '1.4px',
            borderStyle: 'solid',
            borderRadius: '5px',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .06)',
                cursor: 'pointer',
            },
            '&:active': {
                backgroundColor: 'rgba(0, 0, 0, .1)',
                cursor: 'pointer',
            },
        },
        divider: {
            backgroundColor: theme.palette.primary.dark,
            opacity: 0.12,
            '&$vertical': {},
            '&$horizontal': {},
        },
        vertical: {},
        horizontal: {},
        // TODO: Something happened and a lot of css classes require "!important" now - check what's causing it
        // Especially margin or display flex
        // TODO: Checkout nicer border styles
        // Comments section
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        searchInputRoot: {
            color: 'inherit',
        },
        searchInputInput: {
            fontSize: `${theme.typography.body2.fontSize} !important`,
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    })
);

export { useStyles };
