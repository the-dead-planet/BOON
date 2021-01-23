import axios from 'axios';
import { CommentData, Comment, CrudService } from '../logic/types';

type CommentsService = Pick<CrudService<Comment, CommentData>, 'getAll' | 'add' | 'delete'>;

const commentsService: CommentsService = {
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

export default commentsService;
