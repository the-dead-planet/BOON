import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loading, Empty } from '../components/Loading';

type RedirectToFirstProps = {
    items: Array<string> | null;
    modelPath: string;
};

/**
 * Given a list of ids, try to redirect to the details page of the first item.
 * Waits for the data to become available, effectively handling pending
 * requests.
 *
 * NOTE: the component contains `Redirect`. Use with care - more specifically,
 * at most one instance of this coponent should exist per page.
 */
const RedirectToFirst: React.FC<RedirectToFirstProps> = ({ items, modelPath }) => {
    if (items === null) {
        return <Loading />;
    } else if (items!.length == 0) {
        return <Empty />;
    } else {
        const first = items[0];
        return <Navigate to={`/${modelPath}/${first}`} replace={true} />;
    }
};

export default RedirectToFirst;
