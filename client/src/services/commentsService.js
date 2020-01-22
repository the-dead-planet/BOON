import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/comments`);
        return res.data || [];
    },

    add: data => {
        return axios.post('/api/comments', data);
    },

    delete: data => {
        return axios.delete(`/api/comments/${data._id}`, data);
    },
};
