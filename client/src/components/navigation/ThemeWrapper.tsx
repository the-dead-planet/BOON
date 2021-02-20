import React from 'react';
import { createTheme } from '../../styles/themes';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Mode, ThemeType } from '../../logic/types';

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

const ThemeWrapper = ({ mode, themeType, children }: Props) => {
    const theme = createTheme(mode, themeType);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;
