import { createTheme } from '../../styles/themes';
import { ThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as AppState from '../../app-state';
import * as Hooks from '../../hooks';

/*
  This component should serve as a wrapper for all pages. 
  Jumbotron and appBar are optional so the component can be use for either an option with both, with only jumbotron or only appBar.
  Drawer allows additional properties, like variant. Not specified (default) is temporary. Other option is: persistent.
*/
interface Props {
    children?: React.ReactNode;
}

const ThemeWrapper: React.FC<Props> = ({ children }) => {
    const ui = Hooks.useSubject(AppState.ui$);
    const theme = createTheme(ui.mode, ui.theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;
