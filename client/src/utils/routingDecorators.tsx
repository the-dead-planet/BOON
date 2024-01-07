import qs from 'qs';
import { withRouter } from 'react-router';

// TODO: This might not be needed in react router - test and remove
// Maps a react-router's `history` object to a simple `push` function.
const historyToPush = (wrappedComponent: any) => (props: any) => {
    const { history } = props;
    const push = (destination: any) => history.push(destination);
    return wrappedComponent({ ...props, push });
};

// Injects a `push` property which handles client-side redirects.
export const withPush = (wrappedComponent: any) => withRouter(historyToPush(wrappedComponent));

// Injects a `next` property to the wrapped component which, when invoked, will redirect the client to a specified path.
// Should be applied to a component decorated with `withPush`.
export const withNext = (wrappedComponent: any) => (props: any) => {
    const { location, push } = props;
    const nextPath = qs.parse(location.search, { ignoreQueryPrefix: true }).next || '/';
    const next = () => push(nextPath);
    return wrappedComponent({ ...props, next });
};
