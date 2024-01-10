import { useEffect } from 'react';

interface Props {
    children?: React.ReactNode;
    location: { pathname: string };
}

const ScrollToTop: React.FC<Props> = ({ children, location: { pathname } }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
};

export default ScrollToTop;
