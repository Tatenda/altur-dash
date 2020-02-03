import React from 'react';

interface IProps {
    history: any,
    location: any,
    match: any
}

export const JobsCandidate: React.FC<IProps> = ({ history, location, match }) => {
    return (
        <div className="col-12">
            <div className="containerBody col-12">
                <div className="row">
                    Tatenda
                </div>
            </div>
        </div>
    );
}