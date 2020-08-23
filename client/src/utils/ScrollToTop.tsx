import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

interface Props {
    children: React.ReactChild;
    location: { pathname: string };
}

const ScrollToTop: any = ({ children, location: { pathname } }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
};

export default withRouter(ScrollToTop);
