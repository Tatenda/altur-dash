// import config from 'config';
import { authHeader, handleResponse } from '../_helpers';


const api = process.env.REACT_APP_SERVER_URL;
export const userService = {
    getAll,
    getUserOrganisations
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`/users`, requestOptions).then(handleResponse);
}

function getUserOrganisations(user: any) {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    // return fetch(`/users`, requestOptions).then(handleResponse);
    return fetch(`${api}users/${user.id}/organisations`, requestOptions).then(handleResponse);
}