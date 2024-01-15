import { Navigate, useLocation } from 'react-router-dom';
import { PATHS } from '../../constants/data';
import * as Types from './types';

/**
 * Redirects to the login page if the user is not logged in.
 */
export const AuthenticatedPage: React.FC<Types.Props> = ({ user, children }) => {
    const location = useLocation();

    if (!user) {
        return <Navigate to={{ pathname: PATHS.login, search: `?next=${location.pathname}` }} />;
    }

    return children;
}
