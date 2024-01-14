import { Navigate } from 'react-router-dom';
import { PATHS } from '../constants/data';
const { login, main } = PATHS;

export interface WithLoginProps { user: string, location: { pathname: string } }

// Renders the component if the user is logged in.
// Redirects to the login page otherwise.
export function withLoginRequired<T>(wrappedComponent: React.FC<T>) {
    return (props: WithLoginProps) => {
        const {
            user,
            location: { pathname },
        } = props;

        if (user) {
            return wrappedComponent(props as T);
        } else {
            return <Navigate to={{ pathname: login, search: `?next=${pathname}` }} />;
        }
    };
}

// Renders the component if the user is not logged in.
// Redirects to the login page otherwise.
export function withoutLoginRequired<T>(wrappedComponent: React.FC<T>) {
    return (props: T & WithLoginProps) => {
        const {
            user,
            // location: { pathname },
        } = props;
        if (!user) {
            return wrappedComponent(props as T);
        } else {
            return <Navigate to={{ pathname: main }} />;
        }
    };
}
