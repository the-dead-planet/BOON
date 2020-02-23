import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/projects`);
        return res.data || [];
    },

    getOne: async data => {
        let res = await axios.get(`/api/projects/${data.objectId}`);
        return res.data || [];
    },

    add: data => {
        return axios.post('/api/projects', data);
    },

    update: data => {
        return axios.put(`/api/projects/${data.objectId}`, data);
    },

    delete: data => {
        return axios.delete(`/api/projects/${data.objectId}`, data);
    },
};
