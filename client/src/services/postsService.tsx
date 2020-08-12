import axios from 'axios';
import { PostData } from '../logic/types';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/posts`);
        return res.data || [];
    },

    add: (data: PostData) => {
        return axios.post('/api/posts', data);
    },

    delete: (data: any) => {
        return axios.delete(`/api/posts/${data.objectId}`, data);
    },
};
