import axios from 'axios';
import { CommentData } from '../logic/types';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/comments`);
        return res.data || [];
    },

    add: (data: CommentData) => {
        return axios.post('/api/comments', data);
    },

    delete: (data: any) => {
        return axios.delete(`/api/comments/${data.objectId}`, data);
    },
};
