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
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)
