import axios from 'axios';
import { UserData, User, CrudService } from '../logic/types';

type UsersService = Pick<CrudService<User, UserData>, 'getAll' | 'getOne' | 'update'>;

const usersService: UsersService = {
    getAll: async () => {
        let res = await axios.get(`/api/users`);
        return res.data || [];
    },

    getOne: async (data: UserData) => {
        let res = await axios.get(`/api/users/${data.objectId}`);
        return res.data || [];
    },

    update: (data: UserData) => {
        return axios.put(`/api/users/${data.objectId}`, data);
    },
};

export default usersService;
