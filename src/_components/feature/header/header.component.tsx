import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../_hooks/App.context';
import { Link } from 'react-router-dom';
import { authenticationService } from '../../../_services';
import { history } from '../../../_helpers';
import { OrganisationContext } from '../../../_hooks/Organisation.context';

export const Header = () => {
    const appState = useContext(AppContext);
    const { organisationState } = useContext(OrganisationContext);

    function logout() {
        authenticationService.logout();
        history.push('/login');
    }

    useEffect(() => {
    });

    if (appState.authenticated) {
        return (<nav className="col-12 navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">Home</Link>
                <a onClick={logout} className="nav-item nav-link">Logout</a>
                <Link to="/" className="nav-item nav-link">{organisationState.title}</Link>
            </div>
        </nav>);
    }
    return (<nav className="col-12 navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link">Home</Link>
        </div>
    </nav>)
}
