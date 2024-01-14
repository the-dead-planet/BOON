/* 
    The purpose of this file is to create themes for the applications.
    Themes are passed as props to the src/components/navigation/ThemeWrapper.tsx
    There are multiple theme types available to configure, each has light and dark mode.
    Theme types give a completely different styling, while mode just switch between light and dark colors within a theme type.
*/
import { Mode, ThemeType } from '../logic/types';
import { Theme, responsiveFontSizes, createTheme as createMuiTheme } from '@mui/material';
import bgFrosticLight from '../img/background/bg-frostic-light.jpg';
import bgFrosticDark from '../img/background/bg-frostic-dark.jpg';

// font-family: 'Libre Baskerville', serif;
// Wrapper for the function in order to pass type parameter.
// Requires defining 'const theme' in components which make use of it. See Layout.tsx
const createTheme = (mode: Mode, themeType: ThemeType, _customTheme?: Theme) => {
    // Default theme - minimalistic white / black design
    // It's allowed to customize default theme, if provided replace default theme with customTheme
    const defaultTheme = {
        palette: {
            type: mode,
            primary: {
                light: '#26547C',
                main: '#2E294E',
                dark: '#2E294E',
                contrastText: 'rgba(255, 255, 255, .87)',
            },
            secondary: {
                light: '#D55672',
                main: '#D90368',
                dark: '#820263',
                contrastText: 'rgba(255, 255, 255, .6)',
            },
            common: {
                black: '#000',
                white: '#fff',
            },
            background: {
                paper: mode === 'dark' ? '#101119' : '#FFFFFF',
                default: mode === 'dark' ? '#000' : '#FAFAFA',
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
                contrastText: '#rgba(0, 0, 0, 0.87',
            },
            success: {
                light: '#81c784',
                main: '#4caf50',
                dark: '#388e3c',
                contrastText: '#rgba(0, 0, 0, 0.87',
            },
            text: {
                primary: mode === 'dark' ? 'rgba(255, 255, 255, .87)' : '#2E294E',
                secondary: mode === 'dark' ? 'rgba(255, 255, 255, .6)' : '#D90368',
                disabled: 'rgba(133, 30, 30, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
            },
        },
        typography: {
            fontFamily: 'Poppins, sans-serif',
            // fontSize: 14,
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    body: {
                        minHeight: '100vh',
                        minWidth: '100%',
                        backgroundColor: mode === 'dark' ? '#000' : '#FAFAFA',
                        boxShadow: 'none',
                        backgroundImage: 'none',
                    },
                },
            },
        },
    };

    // Vintage theme - styled as a vintage newspaper
    const vintage = {
        palette: {
            type: mode,
            primary: {
                light: '#CCC5B9',
                main: '#252422',
                dark: '#0F1517',
                contrastText: 'rgba(255, 255, 255, .87)',
            },
            secondary: {
                light: '#D7B49E',
                main: '#CE4257',
                dark: '#720026',
                contrastText: 'rgba(255, 255, 255, .6)',
            },
            common: {
                black: '#000',
                white: '#fff',
            },
            background: {
                paper: mode === 'dark' ? '#252422' : '#F4F2EF',
                default: mode === 'dark' ? '#000' : '#F2E5E4',
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
                contrastText: '#rgba(0, 0, 0, 0.87)',
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
                contrastText: '#rgba(0, 0, 0, 0.87)',
            },
            text: {
                primary: mode === 'dark' ? 'rgba(255, 255, 255, .87)' : '#252422',
                secondary: mode === 'dark' ? '#rgba(255, 255, 255, .6)' : '#403D39',
                disabled: 'rgba(133, 30, 30, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
            },
        },
        typography: {
            fontFamily: 'Libre Baskerville, serif',
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
                        backgroundColor: mode === 'dark' ? '#000' : '#F2E5D4',
                        boxShadow: `2px 3px 20px black, 0 0 100px ${mode === 'dark' ? '#000' : '#a89782'} inset`,
                        backgroundImage:
                            mode === 'light'
                                ? `url('https://www.transparenttextures.com/patterns/paper-fibers.png'), 
                                            url('https://www.transparenttextures.com/patterns/natural-paper.png')`
                                : 'none',
                        /* TODO: This is mostly intended for prototyping; please download the pattern and re-host for production */
                    },
                },
            },
        },
    };

    // Frostic theme - glassmorphism design
    const frostic = {
        palette: {
            type: mode,
            primary: {
                light: '#26547C',
                main: '#2E294E',
                dark: '#2E294E',
                contrastText: 'rgba(255, 255, 255, .87)',
            },
            secondary: {
                light: '#D55672',
                main: '#D90368',
                dark: '#820263',
                contrastText: 'rgba(255, 255, 255, .6)',
            },
            common: {
                black: '#000',
                white: '#fff',
            },
            background: {
                paper: mode === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, .9)',
                default: mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
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
                contrastText: '#rgba(0, 0, 0, 0.87',
            },
            success: {
                light: '#81c784',
                main: '#4caf50',
                dark: '#388e3c',
                contrastText: '#rgba(0, 0, 0, 0.87',
            },
            text: {
                primary: mode === 'dark' ? 'rgba(255, 255, 255, .87)' : 'rgba(255, 255, 255, .87)',
                secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.87)',
                disabled: 'rgba(133, 30, 30, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
            },
        },
        typography: {
            fontFamily: 'Poppins, sans-serif',
            // fontSize: 14,
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    body: {
                        minHeight: '100vh',
                        minWidth: '100%',
                        backgroundImage: `url(${mode === 'light' ? bgFrosticLight : bgFrosticDark})`,
                        backgroundSize: 'cover',
                    },
                },
            },
        },
    };

    // Custom - by default the same as defaultTheme
    // const custom = customTheme || defaultTheme;

    // Add responsive font sizes and create theme based on selected app
    let theme;

    switch (themeType) {
        case 'vintage':
            theme = vintage;
            break;

        case 'frostic':
            theme = frostic;
            break;

        default:
            theme = defaultTheme;
    }

    return responsiveFontSizes(createMuiTheme(theme));
};

export { createTheme };
