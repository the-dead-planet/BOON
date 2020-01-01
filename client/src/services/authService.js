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
    login: (password, email) => sendRawPostRequest('/login', { password, email }),
    logout: (password, email) => sendRawPostRequest('/logout', { password, email }),
    register: (username, password, email, team) => sendRawPostRequest('/register', { username, password, email, team }),
    whoami: () =>
        axios
            .get('/api/whoami')
            .then(response => response.data)
            .catch(error => ({ user: null })),
};
