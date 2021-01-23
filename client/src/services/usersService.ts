import axios from 'axios';
import { UserData, User } from '../logic/types';
import { crudService, CrudService } from '../logic/service';

type UsersService = Pick<CrudService<User, UserData>, 'getAll' | 'getOne' | 'update'>;

// An instance will all CRUD operations defined.
const fullUsersService = crudService<User, UserData>('users');

// A subset of the instance above. Some operations (i.e. create) are not
// available for the Users API.
const usersService: UsersService = (({ getAll, getOne, update }) => ({ getAll, getOne, update }))(fullUsersService);

export default usersService;
