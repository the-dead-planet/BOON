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
    });

// TODO: Use either `username` or `email` for auth, but not both.
export default {
    login: (username, password, email) => sendRawPostRequest('/login', { username, password, email }),
    register: (username, password, email) => sendRawPostRequest('/register', { username, password, email }),
    whoami: () =>
        axios
            .get('/api/whoami')
            .then(response => response.data)
            .catch(error => null),
};
