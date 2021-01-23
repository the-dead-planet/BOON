import axios from 'axios';
import { SprintData, Sprint, CrudService, WithObjectId } from '../logic/types';

type SprintsService = CrudService<Sprint, SprintData>;

const sprintsService: SprintsService = {
    getAll: async () => {
        let res = await axios.get(`/api/sprints`);
        return res.data || [];
    },

    getOne: async (data: WithObjectId) => {
        let res = await axios.get(`/api/sprints/${data.objectId}`);
        return res.data || [];
    },

    add: (data: SprintData) => {
        return axios.post('/api/sprints', data);
    },

    update: (data: SprintData & WithObjectId) => {
        return axios.put(`/api/sprints/${data.objectId}`, data);
    },

    delete: (data: any) => {
        return axios.delete(`/api/sprints/${data.objectId}`, data);
    },
};

export default sprintsService;
