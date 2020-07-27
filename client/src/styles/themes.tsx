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

// Wrapper for the function in order to pass type parameter.
// Requires defining 'const theme' in components which make use of it. See Layout.tsx
const createTheme = (type: Mode) => {
    let theme = createMuiTheme({
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
                paper: type === 'dark' ? '#372549' : '#fff',
                default: type === 'dark' ? '#1A1423' : '#fafafa',
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
                primary: type === 'dark' ? '#fff' : '#540D6E',
                secondary: type === 'dark' ? '#fff' : '#540D6E',
                disabled: 'rgba(133, 30, 30, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
            },
        },
        typography: {
            fontFamily: 'Raleway, sans-serif',
            fontSize: 14,
        },
    });

    return responsiveFontSizes(theme);
};

export { createTheme };
