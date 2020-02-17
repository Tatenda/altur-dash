import { BehaviorSubject } from 'rxjs';
import { handleResponse, authHeader } from '../_helpers';
import { RegisterModel } from '../_models/register.model';
const jwtDecode = require('jwt-decode');

const currentUserSubject = new BehaviorSubject(JSON.parse('' + localStorage.getItem('altur')));
const api = process.env.REACT_APP_SERVER_URL;

export const authenticationService = {
    login,
    logout,
    register,
    update,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value },
    delete: _delete
};

function login(email: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    return fetch(`${api}auth/tokens`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('altur', JSON.stringify(jwtDecode(user.token)));
            currentUserSubject.next(user);
            return user;
        }, error => {
            return Promise.reject(error);
        });
}

function logout() {
    localStorage.removeItem('altur');
    currentUserSubject.next(null);
}

function register(model: RegisterModel) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return fetch(`${api}users`, requestOptions).then(handleResponse);
}

function update(user: any) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${user.id}`, requestOptions as RequestInit).then(handleResponse);;
}

function _delete(id: number) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${id}`, requestOptions as RequestInit).then(handleResponse);
}
