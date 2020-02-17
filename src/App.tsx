import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers';
import { authenticationService } from './_services';
import {
    PrivateRoute, Enqueue,
    LoginPage, RegisterPage, Dashboard
} from './_components';
// import logo from './logo.svg';
import './App.scss';
import { ErrorBoundary } from './_components/shared/ErrorBoundary';
import { FullQueueView } from './_components/feature/queue-view/fullQueueView.component';
import { AppContext } from './_hooks/App.context';
import { MainContainer } from './_components/feature/main-container/mainContainer.component';
import { Organisation, reducer, OrganisationContext } from './_hooks/Organisation.context';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState({});
    let [organisationState, dispatch] = React.useReducer(reducer, Organisation);

    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    });

    return (
        <AppContext.Provider value={{
            authenticated: true,
            lang: 'en',
            showHeader: true
        }}>
            <OrganisationContext.Provider value={{ organisationState, dispatch }} >
                <Router history={history}>
                    <div className="mainContainer" >
                        <div className="container-fluid">
                            <div className="row">
                                <ErrorBoundary>
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                    <PrivateRoute exact path="/" component={Dashboard} />
                                    <PrivateRoute exact path="/enqueue" component={Enqueue} />
                                    <PrivateRoute exact path="/queue-view" component={FullQueueView} />
                                    <PrivateRoute path="/dashboard" component={MainContainer} />
                                </ErrorBoundary>
                            </div>
                        </div>
                    </div>
                </Router>
            </OrganisationContext.Provider>
        </AppContext.Provider >
    );
}

export default App;
