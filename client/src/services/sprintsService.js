import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/sprints`);
        return res.data || [];
    },

    add: data => {
        return axios.post('/api/sprints', data);
    },

    update: data => {
        return axios.put('/api/sprints', data);
    },

    delete: data => {
        return axios.delete(`/api/sprints/${data.objectId}`, data);
    },
};
