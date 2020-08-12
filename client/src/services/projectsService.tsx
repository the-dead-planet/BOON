import axios from 'axios';
import { ProjectData } from '../logic/types';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/projects`);
        return res.data || [];
    },

    getOne: async (data: { objectId: string }) => {
        let res = await axios.get(`/api/projects/${data.objectId}`);
        return res.data || [];
    },

    add: (data: ProjectData) => {
        return axios.post('/api/projects', data);
    },

    update: (data: ProjectData) => {
        return axios.put(`/api/projects/${data.objectId}`, data);
    },

    delete: (data: any) => {
        return axios.delete(`/api/projects/${data.objectId}`, data);
    },
};
