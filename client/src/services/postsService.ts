import axios from 'axios';
import { PostData, Post, CrudService } from '../logic/types';

type PostsService = Pick<CrudService<Post, PostData>, 'getAll' | 'add' | 'delete'>;

const postsService: PostsService = {
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

export default postsService;
