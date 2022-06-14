import { apiUrl } from 'config';
import { fetchWrapper } from 'helpers';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/users`;

async function getAll() {
    // return fetchWrapper.get(baseUrl);
    const res = await fetch(`${apiUrl}/users`);
    const users = await res.json();
    return users;
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
