import { withNext, withPush } from '../utils/routingDecorators';
import { withRouter } from 'react-router';

// HOC for pages rendered as a side effect of accessing another page, e.g.
// a Login form displayed when rendering a forbidded page.
//
// Injects utilities for redirecting back to the original page.
// NOTE: TS gets confused here, hence the `any`.
// TODO: remove `any`, add a proper signature.
export const interceptPage = (wrappedComponent: any): any => (withRouter as any)(withPush(withNext(wrappedComponent)));
