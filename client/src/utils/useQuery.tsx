import { useLocation } from 'react-router-dom';

export const useQuery = () => {
    const query = new URLSearchParams(useLocation().search);

    return query;
};
