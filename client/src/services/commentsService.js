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
        return axios.delete(`/api/sprints/${data.sprintId}/comments/${data.commentId}`, data);
    },

    // deletePostComment: data => {
    //     return axios.delete(`/api/posts/${data.postId}/comments/${data.commentId}`, data);
    // },
};
