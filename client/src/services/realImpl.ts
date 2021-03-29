/**
 * The "real" implementation of the `Services` bundle.
 * Talks to a remote enpoint through HTTP.
 */
import axios from 'axios';
import { sendRawPostRequest, crudService } from '../logic/service';
import Services, { WrappedUserData, AuthService } from './services';

const getData = <T>({ data }: { data: T }): T => data;

/** Path to the server.
 * If served locally, you can use a relative path, i.e. one starting with `/`.
 * See the proxy property in package.json to see what `/` resolves to (development only).
 *
 * If pointing to a non-local instance, provide a full path, i.e. one starting with `https://`.
 */
const API_PREFIX = process.env.REACT_APP_API_PREFIX || '';

const buildApiPath = (path: string): string => `${API_PREFIX}/${path}`;

const authService: AuthService = {
    login: (password: string, email: string) =>
        sendRawPostRequest<WrappedUserData>(buildApiPath('auth/login'), { password, email }).then(getData),
    logout: () => axios.post(buildApiPath('auth/logout')).then((response) => response.data),
    register: (username: string, password: string, email: string, team: string) =>
        sendRawPostRequest<WrappedUserData>(buildApiPath('auth/register'), { username, password, email, team }).then(
            getData
        ),
    whoami: () =>
        axios
            .get(buildApiPath('auth/whoami'))
            .then((response) => response.data)
            .catch(() => ({ user: null })),
};

const realImpl: Services = {
    authService,
    commentsService: crudService('comments'),
    likesService: crudService('likes'),
    postsService: crudService('posts'),
    projectsService: crudService('projects'),
    sprintsService: crudService('sprints'),
    usersService: crudService('users'),
};

export default realImpl;
