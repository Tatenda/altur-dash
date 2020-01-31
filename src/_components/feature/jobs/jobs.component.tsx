import React from 'react';
import { JobCreate } from './jobCreate.component';
import { Route } from 'react-router-dom';
import { JobList } from './jobList.component';
import { JobsView } from './jobView.component';

export const Jobs = () => {
    return (
        <div className="col-10 jobBody">
            <div className="row">
                <Route exact path="/dashboard/jobs/create" component={JobCreate} />
                <Route path="/dashboard/jobs/list" component={JobList} />
                <Route path="/dashboard/jobs/id/:id" component={JobsView} />
            </div>
        </div>
    );
}