import { authHeader, handleResponse } from '../_helpers';

export const organisationServuce = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`/users`, requestOptions).then(handleResponse);
}

