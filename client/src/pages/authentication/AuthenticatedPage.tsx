import { Navigate, useLocation } from 'react-router-dom';
import * as Routes from '../../routes';
import * as Types from './types';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

/**
 * Redirects to the login page if the user is not logged in.
 */
export const AuthenticatedPage: React.FC<Types.Props> = ({ children }) => {
    const user = Hooks.useSubject(AppState.user$);
    const location = useLocation();

    if (!user) {
        return <Navigate to={{ pathname: Routes.Types.RouterPaths.Login, search: `?next=${location.pathname}` }} replace={true} />;
    }

    return children;
}
