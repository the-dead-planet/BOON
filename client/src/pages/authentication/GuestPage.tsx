import { Navigate } from 'react-router-dom';
import { PATHS } from '../../constants/data';
import * as Types from './types';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

/**
 * Redirects to the main page if the user is logged in.
 */
export const GuestPage: React.FC<Types.Props> = ({ children }) => {
    const user = Hooks.useSubject(AppState.user$);

    if (user) {
        return <Navigate to={{ pathname: PATHS.main }} />;
    }

    return children;
}
