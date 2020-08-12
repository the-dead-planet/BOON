import axios from 'axios';
import { UserData } from '../logic/types';

export default {
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
