import qs from 'qs';
import { withRouter } from 'react-router';

// Maps a react-router's `history` object to a simple `push` function.
const historyToPush = wrappedComponent => props => {
    const { history } = props;
    const push = destination => history.push(destination);
    return wrappedComponent({ ...props, push });
};

// Injects a `push` property which handles client-side redirects.
export const withPush = wrappedComponent => withRouter(historyToPush(wrappedComponent));

// Injects a `next` property to the wrapped component which, when invoked, will redirect the client to a specified path.
// Should be applied to a component decorated with `withPush`.
export const withNext = wrappedComponent => props => {
    const { location, push } = props;
    const nextPath = qs.parse(location.search, { ignoreQueryPrefix: true }).next || '/';
    const next = () => push(nextPath);
    return wrappedComponent({ ...props, next });
};
