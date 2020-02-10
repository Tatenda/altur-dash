import { handleResponse, authHeader } from '../_helpers';
import { CreateCategory } from '../_models/category.model';

const api = process.env.REACT_APP_SERVER_URL;

const addCategory = (model: CreateCategory) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return fetch(`${api}categories`, requestOptions)
        .then(handleResponse);
}

const getCategories = () => {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`${api}categories`, requestOptions).then(handleResponse);
}


export const categoryService = {
    addCategory,
    getCategories
}