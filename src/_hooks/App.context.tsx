import React from 'react';

interface IAppContextProps {
    authenticated: boolean
    lang: string
    showHeader: boolean
}

const initialState = {
    authenticated: true,
    lang: 'en',
    showHeader: true
}

const AppContext = React.createContext<IAppContextProps>(initialState);

export { AppContext, initialState };
