import { handleResponse, authHeader } from '../_helpers';
import { CompanyCreateModel } from '../_models/company.model';

const api = process.env.REACT_APP_SERVER_URL;

const addCompany = (model: CompanyCreateModel) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return fetch(`${api}companies`, requestOptions)
        .then(handleResponse)
        .catch(err => {
            console.log(err);
        });
}

const getCompany = () => {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`${api}companies`, requestOptions).then(handleResponse);
}

const getCompanyById = (id: string) => {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`${api}companies/${id}`, requestOptions).then(handleResponse);
}

const getCompanyJobs = (id: string) => {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`${api}companies/${id}/jobs`, requestOptions).then(handleResponse);
}


const deleteCompany = (id: string) => {
    const requestOptions = { method: 'DELETE', headers: authHeader() } as RequestInit;
    return fetch(`${api}companies/${id}`, requestOptions).then(handleResponse);
}


export const companyService = {
    addCompany,
    getCompany,
    getCompanyById,
    deleteCompany,
    getCompanyJobs
}