import { CssBaseline } from '@mui/material';
import ThemeWrapper from '../components/navigation/ThemeWrapper';
import LayoutContent from './LayoutContent';
import { LayoutProps } from './LayoutContent';

/*
  This component should serve as a wrapper for all pages. 
  Jumbotron and appBar are optional so the component can be use for layout with both, 
  with only jumbotron or only appBar or none of them but making use of the ThemeWrapper.
  Drawer allows additional properties, like variant. Not specified (default) is temporary. Other option is: persistent.
*/
const AppLayout = ({ ...props }: LayoutProps) => {
    return (
        <ThemeWrapper>
            <CssBaseline />
            <LayoutContent {...props} />
        </ThemeWrapper>
    );
};

export default AppLayout;
