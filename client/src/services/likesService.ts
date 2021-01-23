import axios from 'axios';
import { Like, LikeData, CrudService } from '../logic/types';

type LikesService = Pick<CrudService<Like, LikeData>, 'getAll' | 'add' | 'delete'>;

const likesService: LikesService = {
    getAll: async () => {
        let res = await axios.get(`/api/likes`);
        return res.data || [];
    },

    add: (data: Like) => {
        return axios.post('/api/likes', data);
    },

    delete: (data: any) => {
        return axios.delete(`/api/likes/${data.objectId}`, data);
    },
};

export default likesService;
