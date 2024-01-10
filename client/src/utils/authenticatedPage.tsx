import { withLoginRequired, withoutLoginRequired } from './authDecorators';

// HOC for pages requiring the user to be authenticated.
//
// Redirects to the login page if the user is not logged in.
export function authenticatedPage<T>(wrappedComponent: React.FC<T>) {
    return withLoginRequired(wrappedComponent);
}

// Redirects to the main page if the user is logged in.
export function guestPage<T>(wrappedComponent: React.FC<T>) {
    return withoutLoginRequired<T>(wrappedComponent);
}
