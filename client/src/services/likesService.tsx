import axios from 'axios';
import { Like } from '../logic/types';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/likes`);
        return res.data || [];
    },

    add: (data: Like) => {
        return axios.post('/api/likes', data);
    },

    delete: (data: any) => {
        return axios.delete(`/api/likes/${data.objectId}`, data);
    },
};
