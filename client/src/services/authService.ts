import axios from 'axios';
import { sendRawPostRequest } from '../logic/service';
import { WrappedUserData, AuthService } from './services';

const getData = <T>({ data }: { data: T }): T => data;

const authService: AuthService = {
    login: (password: string, email: string) =>
        sendRawPostRequest<WrappedUserData>('/api/auth/login', { password, email }).then(getData),
    logout: () => axios.post('/api/auth/logout').then((response) => response.data),
    register: (username: string, password: string, email: string, team: string) =>
        sendRawPostRequest<WrappedUserData>('/api/auth/register', { username, password, email, team }).then(getData),
    whoami: () =>
        axios
            .get('/api/auth/whoami')
            .then((response) => response.data)
            .catch(() => ({ user: null })),
};

export default authService;
