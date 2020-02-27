import axios from 'axios';
import qs from 'qs';

const sendRawPostRequest = (url, data) =>
    axios({
        method: 'post',
        url,
        data: qs.stringify(data),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    }).then(response => response.data);

export default {
    login: (password, email) => sendRawPostRequest('/api/auth/login', { password, email }),
    logout: () => axios.post('/api/auth/logout').then(response => response.data),
    register: (username, password, email, team) =>
        sendRawPostRequest('/api/auth/register', { username, password, email, team }),
    whoami: () =>
        axios
            .get('/api/auth/whoami')
            .then(response => response.data)
            .catch(error => ({ user: null })),
};
