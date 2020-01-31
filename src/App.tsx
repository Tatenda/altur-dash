import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers';
import { authenticationService } from './_services';
import {
    PrivateRoute, Enqueue,
    HomePage, LoginPage, RegisterPage
} from './_components';
// import logo from './logo.svg';
import './App.scss';
import { ErrorBoundary } from './_components/shared/ErrorBoundary';
import { FullQueueView } from './_components/feature/queue-view/fullQueueView.component';
import { AppContext } from './_hooks/showHeader.context';
import { MainContainer } from './_components/feature/main-container/mainContainer.component';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    });

    function logout() {
        authenticationService.logout();
        history.push('/login');
    }

    return (
        <AppContext.Provider value={
            {
                lang: 'en',
                authenticated: currentUser ? true : false,
                showHeader: true,
            }
        }>
            <Router history={history}>
                <div className="mainContainer" >
                    <div className="container-fluid">
                        <div className="row">
                            <PrivateRoute exact path="/" component={HomePage} />
                            <ErrorBoundary>
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <PrivateRoute exact path="/enqueue" component={Enqueue} />
                                <PrivateRoute exact path="/queue-view" component={FullQueueView} />
                                <Route path="/dashboard" component={MainContainer} />
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </Router>
        </AppContext.Provider>
    );
}


export default App;
