/* 
    The purpose of this file is to integrate all styles in one place and reuse classes in various components
*/
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
        formPaper: {
            padding: theme.spacing(2),
            color: theme.palette.primary.main,
            width: '50%',
            minWidth: '400px',
            margin: '0 auto',
        },
        col: {
            display: 'flex',
            flexDirection: 'column',
        },
        /* 
            Images
        */
        jumbotron: {
            minHeight: jumbotronHeight,
        },
        jumbotronContent: {
            marginTop: `${toolbarHeight}px`,
            position: 'absolute',
            color: '#fff',
            height: `calc(${jumbotronHeight} - ${toolbarHeight}px)`,
        },
        jumbotronImg: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: jumbotronHeight,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            backgroundColor: '#000', // backgroundImage imported as a component in Layout.tsx
            boxShadow: '0px 2px 4px -1px rgba(0,0, 0.2)',
        },
        image: {
            display: 'block',
            // height: "auto",
            width: '90%',
            borderRadius: '3px',
            margin: '0 auto',
        },

        /* 
            NavBar
        */
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            boxShadow: 'none !important',
            // boxShadow: "0px 2px 4px -1px #fff, 0px 4px 5px 0px #fff, 0px 1px 10px 0px #fff !important",
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        toolbar: {
            minHeight: `${toolbarHeight}px !important`,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            transition: 'width 1s',
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // // necessary for content to be below app bar
            // ...theme.mixins.toolbar,
            minHeight: `${toolbarHeight * 3}px !important`,
            justifyContent: 'flex-end',
        },
        drawerSecondary: {
            maxWidth: '100%',
            width: drawerSecondaryWidth,
            flexShrink: 0,
        },
        drawerSecondaryPaper: {
            maxWidth: '100%',
            width: drawerSecondaryWidth,
            boxShadow: `0 4px 12px ${theme.palette.primary.light} !important`,
            // backgroundColor: theme.palette.primary.main,
            // color: theme.palette.primary.contrastText,
        },
        secondaryDrawerBg: {
            width: '100%',
            minHeight: '100vh',
            position: 'fixed',
            backgroundColor: theme.palette.primary.main,
            opacity: 0.1,
            cursor: 'pointer',
            display: 'block',
            boxSizing: 'border-box',
            // opacity: 1,
            pointerEvents: 'all',
            zIndex: 10,
        },
        contentPadding: {
            flexGrow: 1,
            padding: theme.spacing(3),
            paddingBottom: '5em',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
            paddingBottom: '5em',
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        footer: {
            marginTop: '5em',
            minHeight: '200px',
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            color: 'rgba(255, 255, 255, .6)',
            borderRadius: '20px 20px 0 0',
            position: 'relative',
            '&::after': {
                content: "''",
                position: 'absolute',
                top: '-50px',
                bottom: '100%',
                left: 0,
                right: 0,
                borderStyle: 'solid',
                borderWidth: '0 0 2px 0',
                borderColor: theme.palette.primary.main,
                borderRadius: '20px',
                zIndex: 10,
            },
        },

        // Misc
        loading: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '5%',
            fontSize: '10em',
            color: theme.palette.primary.light,
        },
        noDecoration: {
            textDecoration: 'none',
            color: 'inherit',
        },
        pageNavList: {
            paddingTop: '0px !important',
            paddingBottom: '0px !important',
        },
        bold: {
            fontWeight: 'bold',
        },
        selectedStyle: {
            fontStyle: 'italic',
        },
        selected: {
            backgroundColor: 'rgba(0, 0, 0, .03) !important',
            fontStyle: 'italic',
        },
        pagination: {
            borderTop: `solid 2px ${theme.palette.primary.light}`,
            borderBottom: `solid 2px ${theme.palette.primary.light}`,
        },
        fix: {
            position: 'absolute',
            '&$right': {
                right: '2em',
            },
            '&$left': {
                left: '2em',
            },
        },
        right: {},
        left: {},
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
        },
        fabContainer: {
            position: 'fixed',
            left: 0,
            right: 0,
            width: '100vw',
            top: `calc(100vh - 70px)`,
        },
        fab: {
            // position: 'relative',
            '&$next': {
                right: theme.spacing(4),
                position: 'absolute',
            },
            '&$previous': {
                position: 'absolute',
                left: theme.spacing(2),
            },
        },
        next: {},
        previous: {},
        rotate: {
            transform: 'rotate(180deg)',
        },
        divider: {
            backgroundColor: theme.palette.primary.dark,
            opacity: 0.12,
            '&$vertical': {},
            '&$horizontal': {},
        },
        vertical: {},
        horizontal: {},
        sideCol: {
            position: 'absolute',
            width: `${navBarLeftWidth}px`,
            [theme.breakpoints.down('sm')]: {
                display: 'none',
                visibility: 'hidden',
            },
        },
        panelButton: {
            padding: '.2em .8em',
            // transition: "background-color .6s ease-out, color .1s ease-out",
            '&:hover': {
                // backgroundColor: theme.palette.primary.light,
                // color: theme.palette.primary.contrastText,
                backgroundColor: 'rgba(0, 0, 0, .06)',
                // transition: "background-color .6s ease-out, color .1s ease-out",
            },
            '&:active': {
                // backgroundColor: theme.palette.primary.main,
                // color: theme.palette.primary.contrastText,
                backgroundColor: 'rgba(0, 0, 0, .1)',
                // transition: "background-color .1s ease-out, color .6s ease-out",
            },
        },
        navContainer: {
            padding: 0,
            width: '100%',
            border: `solid 2px ${theme.palette.primary.main}`,
            // borderTopWidth: "20px"
        },
        navTitle: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.default,

            margin: '-1px',
            padding: '.2em',
            textAlign: 'center',
            textTransform: 'uppercase',
        },
        moveContent: {
            marginLeft: `calc(${navBarLeftWidth}px + 10px)`,
            top: 0,
            [theme.breakpoints.down('sm')]: {
                marginLeft: 0,
            },
        },
        mainPost: {
            border: `1px solid ${theme.palette.primary.light}`,
            padding: '.5em',
        },
        mainImg: {
            width: '100%',
            minHeight: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            objectPosition: '50% 50%',
        },
        // TODO: Something happened and a lot of css classes require "!important" now - check what's causing it
        // Especially margin or display flex
        postContainer: {
            marginTop: '1em !important',
        },
        post: {
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: `solid 1px transparent`,
            '&$hover': {
                '&:hover': {
                    borderColor: theme.palette.primary.light,
                    backgroundColor: 'rgba(255, 255, 255, .13)',
                },
            },
        },
        hover: {},
        postBody: {
            textAlign: 'justify',
        },
        signature: {
            marginLeft: 'auto !important',
            marginTop: '1em !important',
            fontStyle: 'italic',
        },
        // TODO: Checkout nicer border styles
        quoteContainer: {
            border: `solid 2px ${theme.palette.primary.main}`,
            position: 'relative',
            '&::after': {
                content: "''",
                position: 'absolute',
                left: '5px',
                right: '5px',
                top: '5px',
                bottom: '5px',
                border: `solid 2px ${theme.palette.primary.light}`,
            },
        },
        quote: {
            textAlign: 'center',
            fontStyle: 'italic',
            marginTop: '1em',
            marginLeft: '1em',
            marginRight: '1em',
        },
        quoteAuthor: {
            marginTop: '1em',
            marginBottom: '2em',
        },
        gossColContainer: {
            marginTop: '2em',
            marginBottom: '1em',
            padding: '.4em',
            position: 'relative',
            '&::after': {
                content: "''",
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                border: `solid 2px ${theme.palette.primary.main}`,
            },
        },
        gossColTitle: {
            paddingTop: '.5em',
            paddingBottom: '.5em',
            textAlign: 'center',
            textTransform: 'uppercase',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
        },
        // Comments section
        commentsTitle: {
            margin: '1em !important',
        },
        addComment: {
            margin: '1em',
        },
        submitComment: {
            display: 'flex !important',
            marginLeft: 'auto !important',
        },
    })
);

export { useStyles };
