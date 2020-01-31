import React, { useState, useEffect } from 'react';
import { authenticationService } from '../../../_services';

const HomePage: React.FC = () => {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);

    useEffect(() => {
    });

    // setCurrentUser("");
    return (
        <div>
            <h1>Hi {currentUser.firstName}!</h1>
            <p>You're logged in with React & JWT!!</p>
        </div>
    );
}

export { HomePage };
