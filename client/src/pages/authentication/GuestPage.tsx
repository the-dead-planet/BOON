import { Navigate } from 'react-router-dom';
import { PATHS } from '../../constants/data';
import * as Types from './types';

/**
 * Redirects to the main page if the user is logged in.
 */
export const GuestPage: React.FC<Types.Props> = ({ user, children }) => {
    console.log('guest', user);
    if (user) {
        return <Navigate to={{ pathname: PATHS.main }} />;
    }

    return children;
}
