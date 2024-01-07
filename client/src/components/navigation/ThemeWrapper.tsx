import React from 'react';
import { createTheme } from '../../styles/themes';
import { ThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ModeType } from '../../logic/types';

/*
  This component should serve as a wrapper for all pages. 
  Jumbotron and appBar are optional so the component can be use for either an option with both, with only jumbotron or only appBar.
  Drawer allows additional properties, like variant. Not specified (default) is temporary. Other option is: persistent.
*/
interface Props {
    mode: Mode;
    themeType: ThemeType;
    children: any;
}

const ThemeWrapper = ({ modeType, children }: Props) => {
    const theme = createTheme(modeType);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;
