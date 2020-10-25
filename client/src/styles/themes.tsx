/* 
    The purpose of this file is to integrate all styles in one place and reuse classes in various components
*/
import { Mode } from '../logic/types';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { fade, makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

// Below components need to be imported to correctly overwrite styles with classes in useStyle
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
const header = require('../img/landing/header-1.jpg');
const header2 = require('../img/landing/header-2.jpg');
// font-family: 'Libre Baskerville', serif;
// Wrapper for the function in order to pass type parameter.
// Requires defining 'const theme' in components which make use of it. See Layout.tsx
const createTheme = (type: Mode) => {
    let theme = createMuiTheme({
        palette: {
            type: type,
            primary: {
                light: '#4D483F', // light is the same color as main but with less opacity
                main: '#252422',
                dark: '#121211',
                contrastText: 'rgba(255, 255, 255, .87)',
            },
            secondary: {
                light: '#E06376',
                main: '#CE4257',
                dark: '#720026',
                contrastText: 'rgba(255, 255, 255, .87)',
            },
            common: {
                black: '#000',
                white: '#fff',
            },
            background: {
                paper: type === 'dark' ? '#252422' : '#F4F2EF',
                default: type === 'dark' ? '#000' : '#F2E5E4',
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
            text: {
                primary: type === 'dark' ? '#fff' : '#252422',
                secondary: type === 'dark' ? '#fff' : '#403D39',
                disabled: 'rgba(133, 30, 30, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
            },
        },
        typography: {
            // fontFamily: 'Raleway, sans-serif',
            fontFamily: 'Libre Baskerville, serif',
            // fontFamily: 'Courier Prime, monospace',
            // fontFamily: 'Permanent Marker, cursive',
            // fontFamily: 'Old Standard TT, serif',
            // fontFamily: 'Neuton, serif',
            // fontFamily: 'Rock Salt, cursiva',
            // fontFamily: 'Caudex, serif',
            // fontFamily: 'Halant, serif',
            fontSize: 14,
        },
        // Below override material ui default classes
        // Background of the app should resemble an old newspaper
        // This is achieved by adding darker shadows on the sides of the page
        // And using a transparent noise texture found here:
        // https://www.transparenttextures.com/
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    body: {
                        minHeight: '100vh',
                        minWidth: '100%',
                        backgroundColor: '#F2E5D4',
                        boxShadow: '2px 3px 20px black, 0 0 100px #a89782 inset',
                        // backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-2.png')"
                        // backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')"
                        // backgroundImage: "url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')"
                        // backgroundImage: "url('https://www.transparenttextures.com/patterns/handmade-paper.png')"
                        backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png'), 
                                            url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
                        // backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png'),
                        //                     url('https://www.transparenttextures.com/patterns/lined-paper.png')`,
                        // backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png'),
                        //                     url('https://www.transparenttextures.com/patterns/paper-3.png')`,
                        /* This is mostly intended for prototyping; please download the pattern and re-host for production */
                    },
                },
            },
        },
    });

    return responsiveFontSizes(theme);
};

export { createTheme };
