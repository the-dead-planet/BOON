// Logic for service implementations.
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import { CrudService } from './types';

/**
 * Sends a x-www-form-urlencoded request.
 */
export const sendRawPostRequest = <Resp>(url: string, data: any): Promise<AxiosResponse<Resp>> =>
    axios({
        method: 'post',
        url,
        data: qs.stringify(data),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    });

const buildApiPath = (path: string): string => `/api/${path}`;

/**
 * Creates a simple CRUD service operating on a given path.
 */
export const crudService = <Obj, ObjData extends { objectId: string }>(path: string): CrudService<Obj, ObjData> => {
    const apiPath = buildApiPath(path);
    const apiPathWithId = (id: string): string => `${apiPath}/${id}`;

    const getAll = (): Promise<Array<Obj>> => axios.get(apiPath).then((resp) => resp.data || []);

    const getOne = (data: { objectId: string }): Promise<Obj | null> =>
        axios.get(apiPathWithId(data.objectId)).then((resp) => resp.data || null);

    const add = (data: ObjData): Promise<AxiosResponse<Obj>> => axios.post(apiPath, data);

    const update = (data: ObjData): Promise<void> => axios.put(apiPathWithId(data.objectId), data);

    // delete is a reserved keyword, hence the `_`
    const delete_ = (data: { objectId: string }): Promise<AxiosResponse<{ id: string }>> =>
        axios.delete(apiPathWithId(data.objectId));

    return { getAll, getOne, add, update, delete: delete_ };
};
