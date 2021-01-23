import axios from 'axios';
import qs from 'qs';
import { Auth, Login, User } from '../logic/types';
import { sendRawPostRequest } from '../logic/service';

type UserData = { user: User };

interface AuthService {
    login(password: string, email: string): Promise<UserData>;
    logout(): Promise<void>;
    register(username: string, password: string, email: string, team: string): Promise<UserData>;
    whoami(): Promise<UserData>;
}

/**
 * Pick the `data` field from an http response, ignore remaining fields.
 */
const getData = (resp: { data: UserData }) => resp.data;

const authService: AuthService = {
    login: (password: string, email: string) =>
        sendRawPostRequest<UserData>('/api/auth/login', { password, email }).then(getData),
    logout: () => axios.post('/api/auth/logout').then((response) => response.data),
    register: (username: string, password: string, email: string, team: string) =>
        sendRawPostRequest<UserData>('/api/auth/register', { username, password, email, team }).then(getData),
    whoami: () =>
        axios
            .get('/api/auth/whoami')
            .then((response) => response.data)
            .catch((error) => ({ user: null })),
};

export default authService;
