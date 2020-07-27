/* 
    The purpose of this file is to integrate all styles in one place and reuse classes in various components
*/
import { Mode } from '../logic/types';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// Below components need to be imported to correctly overwrite styles with classes in useStyle
const landing1 = require('../img/landing/landing-1.png');
const landing2 = require('../img/landing/landing-2.png');
const landing3 = require('../img/landing/landing-3.png');
const landing4 = require('../img/landing/landing-4.png');
const landing5 = require('../img/landing/landing-5.png');

// // Custom palette - colors should be defined here and referenced in classes
// const color1 = '#1A1A1D'; // black
// const color2 = '#950740'; // dark purple
// const color3 = '#F0F0F0'; // light grey
// const color4 = '#6e6e6e'; // lighter black
// const colorHoverLighter = 'rgba(255, 255, 255, 0.075)';
// const colorHoverDarker = 'rgba(0, 0, 0, 0.075)';

// Wrapper for the function in order to pass type parameter.
// Requires defining 'const theme' in components which make use of it. See Layout.tsx
const createTheme = (type: Mode) => {
    let theme = createMuiTheme({
        // For more customization options see https://material-ui.com/customization/default-theme/
        // mixins: {
        //     toolbar: {
        //         // minHeight: "56px", // default
        //         minHeight: "112px",
        //         '@media (min-width:0px) and (orientation: landscape)': {
        //             // minHeight: "48px", // default
        //             minHeight: "96px",
        //         },
        //         '@media (min-width:600px)': {
        //             // minHeight: "64px",   // default
        //             minHeight: "128px",
        //         }
        //     },
        // },
        // TODO: Think if modifying default dark mode backgrounds makes sense, if yes create a separate color palette for dark
        palette: {
            type: type,
            primary: {
                light: '#B75D69',
                main: '#372549',
                dark: '#1A1423',
                // contrastText: "#EAE2B7",
            },
            secondary: {
                light: '#FF9B54',
                main: '#CE4257',
                dark: '#720026',
                // contrastText: color4,
            },
            common: {
                black: '#000',
                white: '#fff',
            },
            background: {
                paper: type === 'light' ? '#fff' : '#372549',
                default: type === 'light' ? '#fafafa' : '#1A1423',
            },
            error: {
                light: '#e57373',
                main: '#CE4257',
                dark: '#d32f2f',
                contrastText: '#fff',
            },
            warning: {
                light: '#ffb74d',
                main: '#ff9800',
                dark: '#f57c00',
                contrastText: '#rgba(0, 0, 0, 0.87',
            },
            info: {
                light: '#64b5f6',
                main: '#2196f3',
                dark: '#1976d2',
                contrastText: '#fff',
            },
            success: {
                light: '#81c784',
                main: '#4caf50',
                dark: '#388e3c',
                contrastText: '#rgba(0, 0, 0, 0.87',
            },
            // grey: {
            //     50: "#fafafa",
            //     100: "#f5f5f5",
            //     200: "#eeeeee",
            //     300: "#e0e0e0",
            //     400: "#bdbdbd",
            //     500: "#9e9e9e",
            //     600: "#757575",
            //     700: "#616161",
            //     800: "#424242",
            //     900: "#212121",
            //     A100: "#d5d5d5",
            //     A200: "#aaaaaa",
            //     A400: "#303030",
            //     A700: "#616161",
            // },
            text: {
                primary: type === 'light' ? '#540D6E' : '#fff',
                secondary: type === 'light' ? '#540D6E' : '#fff',
                disabled: 'rgba(133, 30, 30, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
            },
        },
        typography: {
            fontFamily: 'Raleway, sans-serif',
            // [
            //     '-apple-system',
            //     'BlinkMacSystemFont',
            //     '"Segoe UI"',
            //     'Roboto',
            //     '"Helvetica Neue"',
            //     'Arial',
            //     'sans-serif',
            //     '"Apple Color Emoji"',
            //     '"Segoe UI Emoji"',
            //     '"Segoe UI Symbol"',
            // ].join(','),
            // Base font size to which variants are relative. Default material-ui is 16px
            fontSize: 14,
            // Modify variants here if needed
            // h6: {
            //     fontSize: "0.5rem",
            //     '@media (min-width:600px)': {
            //       fontSize: '1rem',
            //     },
            // }
        },
    });

    theme = responsiveFontSizes(theme);

    theme.typography.h1 = {
        ...theme.typography.h1,
        [theme.breakpoints.down('sm')]: {
            fontSize: '3.25rem',
        },
        [theme.breakpoints.only('xs')]: {
            fontSize: '2.25rem',
        },
    };

    theme.typography.h2 = {
        ...theme.typography.h2,
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.75rem',
        },
        [theme.breakpoints.only('xs')]: {
            fontSize: '1.75rem',
        },
    };

    return theme;
};

// Misc const used in styles
const drawerWidth = 240;
const toolbarHeight = 50;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        /* 
            For Animations page. Notes:
            Material-ui handles pseudo elements and animations in a specific way. Pay attention to:
            - pseudo elements go inside a class and are named "$:<name>" ("$::before" , "$::hover")
            - content style need to be 'double quoted' to work, so content: "''" or content: "'before'"
            - keyframes can be defined by a name in double quotes, e.g. "@keyframes anim: { "0%": {...}, "100%": {...}, }"
            - animation names must be prefixed with $, so: animation: "$anim 2s ease-in"
            - animation timing function property (ease in etc) can use theme provider theme.transitions.easing.easeOut
            - images need to be imported (import image from '../img/image.png)' and referred to as relative path in background properties
                e.g. background: `url(${image})`. Otherwise they won't be displayed (do not use background: url('../img/image.png)).
            
            Useful links:
            - https://cubic-bezier.com/
        */
        jsLoading: {
            '@global': {
                '*': {
                    animationPlayState: 'paused !important',
                },
            },
            '&::before': {
                animationPlayState: 'paused !important',
            },
            '&::after': {
                animationPlayState: 'paused !important',
            },
        },
        background: {
            backgroundColor: '#000',
        },
        headerSimple: {
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1em',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            perspective: '100px',
            position: 'relative',
            textAlign: 'center',
            color: 'white',
            transformStyle: 'preserve-3d',
        },
        headerDownArrow: {
            position: 'absolute',
            bottom: '4vh',
            left: '0',
            right: '0',
            margin: '0 auto',
            zIndex: 20,
            transform: 'translateY(4rem)',
            // animation: `$fade-slide-up .5s 1s ease-out forwards, $pulse 2s 3s ease-out infinite`,
            animation: `$no-transform 1s 4s ease-out forwards, $pulse 2s 5s ease-out infinite`,
            opacity: 0,
        },
        // To remove redundancy in the other keyframe
        '@keyframes no-transform': {
            '100%': {
                opacity: '1',
                transform: 'none',
            },
        },
        '@keyframes pulse': {
            '0%': {
                opacity: 1,
                transform: 'none',
            },
            '50%': {
                opacity: 0.8,
                transform: 'scale(.8)',
            },
            '100%': {
                opacity: 1,
                transform: 'none',
            },
        },
        // BOON landing
        landingHeader: {
            zIndex: 1,
            position: 'relative',
            height: '90vh',
            marginTop: '10vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            textShadow: '2px 2px 4px #000000',
            animation: '$colorAnim 30s ease-in-out infinite',
        },

        offset: {
            padding: '0.2em',
        },
        slideshow: {
            backgroundColor: '#000',
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 0,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            '& li': {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                backgroundRepeat: 'no-repeat' /* images wont repeat horiz or vert*/,
                opacity: 0,
                zIndex: 0,
                animation: '$imageAnimation 30s linear infinite' /* linear - the same speed from beg to end*/,
            },
            '& li:nth-child(1)': {
                backgroundImage: `url(${landing1})`,
            },
            '& li:nth-child(2)': {
                backgroundImage: `url(${landing2})`,
                animationDelay: '6s',
            },
            '& li:nth-child(3)': {
                backgroundImage: `url(${landing3})`,
                animationDelay: '12s',
            },
            '& li:nth-child(4)': {
                backgroundImage: `url(${landing4})`,
                animationDelay: '18s',
            },
            '& li:nth-child(5)': {
                backgroundImage: `url(${landing5})`,
                animationDelay: '24s',
            },
        },
        '@keyframes imageAnimation': {
            '0%': {
                opacity: 0,
                animationTimingFunction: 'ease-in',
            },
            '10%': {
                opacity: 1,
                animationTimingFunction: 'ease-out',
            },
            '20%': {
                opacity: 1,
            },
            '30%': {
                opacity: 0,
            },
        },
        btnSlideshow: {
            boxShadow: '0px 0px 8px 4px',
            border: 'solid 1px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
            margin: '0.4em',
            padding: '0.45em 0.7em',
            fontWeight: 'bold',
            fontSize: '1.2em',
            textDecoration: 'none',
            animation: '$colorAnim 30s ease-in-out infinite',
            cursor: 'pointer',
            '&:hover': {
                boxShadow: '0px 0px 8px 8px',
                /* background-color: rgba(0,0,0, 0.7); */
            },
        },

        '@keyframes colorAnim': {
            '0%': {
                color: 'rgb(26, 11, 230)',
            },
            '10%': {
                color: 'purple',
            },
            '20%': {
                color: 'purple',
            },
            '30%': {
                color: '#db2828',
            },
            '40%': {
                color: '#db2828',
            },
            '50%': {
                color: 'rgb(156, 156, 13)',
            },
            '60%': {
                color: 'rgb(156, 156, 13)',
            },
            '70%': {
                color: 'rgb(7, 109, 7)',
            },
            '80%': {
                color: 'rgb(7, 109, 7)',
            },
            '90%': {
                color: 'rgb(26, 11, 230)',
            },
            '100%': {
                color: 'rgb(26, 11, 230)',
            },
        },

        /* Older browser support */
        noCssanimations: {
            '& slideshow li': {
                opacity: 1,
            },
        },
        fadeIn: {
            zIndex: 1,
            position: 'relative',
            animation: '$fadeIn ease-in 6s',
        },
        '@keyframes fadeIn': {
            '0%': {
                opacity: 0,
            },
            '30%': {
                opacity: 0,
            },
            '80%': {
                opacity: 1,
            },
        },
    })
);

export { useStyles, createTheme };
