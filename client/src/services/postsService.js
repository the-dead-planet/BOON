import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/posts`);
        return res.data || [];
    },

    add: data => {
        return axios.post('/api/posts', data);
    },

    delete: data => {
        return axios.delete(`/api/posts/${data.postId}`, data);
    },
};
