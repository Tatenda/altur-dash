import React, { FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../../_services';

interface IProps {
    component: FunctionComponent,
    exact?: boolean,
    path: string
}

export const PrivateRoute: FunctionComponent<IProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props: any) => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser || typeof currentUser === 'string') {
            authenticationService.logout();
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)
