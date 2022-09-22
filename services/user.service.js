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

const baseUrl = `https://axuwcws74g.execute-api.eu-central-1.amazonaws.com`;

async function getAll() {
    // return fetchWrapper.get(baseUrl);
    // const response = await fetch(`https://axuwcws74g.execute-api.eu-central-1.amazonaws.com/users`);
    const response = await fetch(`${baseUrl}/users`, {
        // mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
    const users = await response.json();
    console.log(users);
    // const jsonara = 
    //     [
    //         {
    //             "password": "12312",
    //             "lastName": "last",
    //             "email": "nikos2@gmail.com",
    //             "role": "User",
    //             "firstName": "Nikos12345",
    //             "title": "Mr",
    //             "id": 1
    //         }
    //     ]
    
    // console.log(jsonara);
    return users;
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

async function create(params) {
    // return fetchWrapper.post(baseUrl, params);

    const response = await fetch(`${baseUrl}/users/signup`, {
        // mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: JSON.stringify(params),
      });
    const resp = await response.json();
    console.log(resp);
    return resp;
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