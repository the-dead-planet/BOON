/* 
    The purpose of this file is to integrate all styles in one place and reuse classes in various components
*/
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// Below components need to be imported to correctly overwrite styles with classes in useStyle
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
const header = require('../img/landing/header-1.jpg');
const header2 = require('../img/landing/header-2.jpg');

// Misc const used in styles
const drawerWidth = 240;
const toolbarHeight = 50;
const jumbotronHeight = '100vh';

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
            minHeight: `${toolbarHeight}px !important`,
            justifyContent: 'flex-end',
        },
        contentPadding: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
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
        },
    })
);

export { useStyles };
