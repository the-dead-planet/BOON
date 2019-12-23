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

// TODO: remove the `team` field from the `User` model;
// Use either `username` or `email` for auth, but not both.
export default {
    login: (username, password, team, email) => sendRawPostRequest('/login', { username, password, team, email }),
    register: (username, password, team, email) => sendRawPostRequest('/register', { username, password, team, email }),
    whoami: () =>
        axios
            .get('/api/whoami')
            .then(response => response.data)
            .catch(error => null),
};
