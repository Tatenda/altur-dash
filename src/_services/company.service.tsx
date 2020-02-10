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

export const companyService = {
    addCompany
}