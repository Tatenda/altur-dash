import { handleResponse, authHeader } from '../_helpers';
import { JobCreateModel } from '../_models/jobs.model';

const api = process.env.REACT_APP_SERVER_URL;

const addJob = (model: JobCreateModel) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return fetch(`${api}jobs`, requestOptions)
        .then(handleResponse);
}

const getJobs = () => {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`${api}jobs`, requestOptions).then(handleResponse);
}

const getJobById = (id: string) => {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`${api}jobs/${id}`, requestOptions).then(handleResponse);
}

const deleteJob = (id: string) => {
    const requestOptions = { method: 'DELETE', headers: authHeader() } as RequestInit;
    return fetch(`${api}jobs/${id}`, requestOptions).then(handleResponse);
}


export const jobsService = {
    addJob,
    getJobs,
    getJobById,
    deleteJob
}