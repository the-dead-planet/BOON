import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/likes`);
        return res.data || [];
    },

    add: data => {
        return axios.post('/api/likes', data);
    },

    delete: data => {
        return axios.delete(`/api/likes/${data.objectId}`, data);
    },
};
