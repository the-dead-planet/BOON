import axios from 'axios';
import { UserData, User, CrudService, WithObjectId } from '../logic/types';

type UsersService = Pick<CrudService<User, UserData>, 'getAll' | 'getOne' | 'update'>;

const usersService: UsersService = {
    getAll: async () => {
        let res = await axios.get(`/api/users`);
        return res.data || [];
    },

    getOne: async (data: WithObjectId) => {
        let res = await axios.get(`/api/users/${data.objectId}`);
        return res.data || [];
    },

    update: (data: UserData & WithObjectId) => {
        return axios.put(`/api/users/${data.objectId}`, data);
    },
};

export default usersService;
