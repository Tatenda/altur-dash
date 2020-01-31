import { BehaviorSubject } from 'rxjs';
import { handleResponse, authHeader } from '../_helpers';
import { RegisterModel } from '../_models/register.model';

const currentUserSubject = new BehaviorSubject(JSON.parse('' + localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    update,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value },
    delete: _delete
};

function login(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function register(model: RegisterModel) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/register`, requestOptions).then(handleResponse);
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
