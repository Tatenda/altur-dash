import React from 'react';

const AppContext = React.createContext({
    authenticated: true,
    lang: 'en',
    showHeader: true,
});

export { AppContext };
