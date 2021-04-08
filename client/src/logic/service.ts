// Logic for service implementations.
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import { WithObjectId } from './types';

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

/**
 * Most services follow a simple CRUD pattern, that allows fetching, updating
 * and deleting instances.

 * `Obj` is the type returned from the service. Contains all details.
 * `ObjData` is the type sent to the service. In most cases, it's a subset of
 * `Obj` and contains only writeable properties.
 *
 * @remarks
 *
 * Types have been inferred from existing codebase (i.e. defined to make
 * the thing compile). They may not be 100% in sync with the actual backend
 * implementation.
 */
export interface CrudService<Obj, ObjData> {
    getAll(): Promise<Array<Obj>>;
    getOne(data: WithObjectId): Promise<Obj | null>;
    add(data: ObjData): Promise<Obj>;
    update(data: ObjData & WithObjectId): Promise<void>;
    delete(data: WithObjectId): Promise<WithObjectId>;
}

/**
 * Creates a simple CRUD service operating on a given path.
 */
export const crudService = <Obj, ObjData>(apiPath: string): CrudService<Obj, ObjData> => {
    const apiPathWithId = (id: string): string => `${apiPath}/${id}`;

    const getAll = (): Promise<Array<Obj>> => axios.get(apiPath).then((resp) => resp.data || []);

    const getOne = (data: WithObjectId): Promise<Obj | null> =>
        axios.get(apiPathWithId(data.objectId)).then((resp) => resp.data || null);

    const add = (data: ObjData): Promise<Obj> => axios.post(apiPath, data).then((resp) => resp.data);

    const update = (data: ObjData & WithObjectId): Promise<void> =>
        axios.put(apiPathWithId(data.objectId), data).then((resp) => resp.data);

    // delete is a reserved keyword, hence the `_`
    const delete_ = (data: WithObjectId): Promise<WithObjectId> =>
        axios.delete(apiPathWithId(data.objectId)).then((resp) => resp.data);

    return { getAll, getOne, add, update, delete: delete_ };
};
