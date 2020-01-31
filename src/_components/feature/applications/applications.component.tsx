import React from 'react';
import { ApplicationsList } from './applicationsList.component';

const Applications: React.FC = () => {
    return (
        <div className="col-10">
            <div className="row">
                <div className="col-12">
                    <ApplicationsList />
                </div>
            </div>
        </div>
    );
}

export { Applications };
