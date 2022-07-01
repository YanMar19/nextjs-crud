import { apiUrl } from 'config';
import { fetchWrapper } from 'helpers';
import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));


export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    getAll,
    login,
    logout,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/users`;

async function getAll() {
    return fetchWrapper.get(baseUrl);
    // const res = await fetch(`${apiUrl}/users`);
    // const users = await res.json();
    // return users;
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function login(username, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}