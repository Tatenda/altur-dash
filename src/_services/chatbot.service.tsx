import { handleResponse, authHeader } from '../_helpers';
import { CreateChatBot } from '../_models/chatbots.model';

const api = process.env.REACT_APP_SERVER_URL;

const addChatbot = (model: CreateChatBot) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return fetch(`${api}chatbots`, requestOptions)
        .then(handleResponse);
}

const getChatbots = () => {
    const requestOptions = { method: 'GET', headers: authHeader() } as RequestInit;
    return fetch(`${api}chatbots`, requestOptions).then(handleResponse);
}

export const chatbotService = {
    addChatbot,
    getChatbots
}