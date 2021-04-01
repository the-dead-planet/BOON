import { withLoginRequired, withoutLoginRequired } from './authDecorators';
import { withRouter } from 'react-router';

// HOC for pages requiring the user to be authenticated.
//
// Redirects to the login page if the user is not logged in.
export const authenticatedPage = (wrappedComponent: any) => withRouter(withLoginRequired(wrappedComponent));

// Redirects to the main page if the user is logged in.
export const guestPage = (wrappedComponent: any) => withRouter(withoutLoginRequired(wrappedComponent));
