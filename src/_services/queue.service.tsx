// import config from 'config';
import { authHeader, handleResponse } from '../_helpers';
import { BehaviorSubject } from 'rxjs';
import { AddToQueueModel, IListItem, UpdateQueueItem, IApiFilters } from '../_models/queue.model';

function getQueue() {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`/users`, requestOptions).then(handleResponse);
}

function joinQueue(model: AddToQueueModel) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/queue/enqueue`, requestOptions as RequestInit).then(handleResponse);
}

const assignBarber = (model: IListItem) => {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/queue/assignBarber`, requestOptions as RequestInit)
        .then(handleResponse);
}

const updateStatus = (model: UpdateQueueItem) => {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/queue/updateStatus`, requestOptions as RequestInit)
        .then(handleResponse);
}

function filter(model?: IApiFilters) {
    let filterStr = '';
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    filterStr = `${(model && model.status) ? `status=${model.status}` : 'status=all'}`;
    model && Object.keys(model).map(key => {
        key !== 'status' && (filterStr += ((key === 'dateObj') && model.dateObj) ?
            `&DateFrom=${model.dateObj.from}&DateTo=${model.dateObj.to}` :
            model[key] ? `&${key}=${model[key]}` : '');
    });
    return fetch(`${process.env.REACT_APP_SERVER_URL}/queue/filter?${filterStr}`, requestOptions as RequestInit).then(handleResponse);
}

export const queueService = {
    getQueue,
    joinQueue,
    assignBarber,
    updateStatus,
    filter
}
