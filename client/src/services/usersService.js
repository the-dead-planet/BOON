import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/users`);
        return res.data || [];
    },

    getOne: async data => {
        let res = await axios.get(`/api/users/${data.objectId}`);
        return res.data || [];
    },

    update: data => {
        return axios.put(`/api/users/${data.objectId}`, data);
    },
};
