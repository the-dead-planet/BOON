import axios from 'axios';
import { SprintData, Sprint, CrudService } from '../logic/types';

type SprintsService = CrudService<Sprint, SprintData>;

const sprintsService: SprintsService = {
    getAll: async () => {
        let res = await axios.get(`/api/sprints`);
        return res.data || [];
    },

    getOne: async (data: { objectId: string }) => {
        let res = await axios.get(`/api/sprints/${data.objectId}`);
        return res.data || [];
    },

    add: (data: SprintData) => {
        return axios.post('/api/sprints', data);
    },

    update: (data: SprintData) => {
        return axios.put(`/api/sprints/${data.objectId}`, data);
    },

    delete: (data: any) => {
        return axios.delete(`/api/sprints/${data.objectId}`, data);
    },
};

export default sprintsService;
