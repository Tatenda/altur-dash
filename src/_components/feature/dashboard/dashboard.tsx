import React from 'react';
import { MainSection } from './MainSection.component';

const Dashboard: React.FC = () => {
    return (
        <div className="col-10">
            <div className="row">
                <div className="col-12">
                    <MainSection />
                </div>
            </div>
        </div>
    );
}

export { Dashboard };
