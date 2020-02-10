import React from 'react';
import { Route } from 'react-router-dom';
import { CompanyCreate } from './companyCreate.component';
import { CompanyList } from './companyList.component';
import { CompanyProfile } from './companyProfile.component';

export const Company = () => {

    return (
        <div className="col-12">
            <div className="row">
                <Route exact path="/dashboard/company" component={CompanyList} />
                <Route exact path="/dashboard/company/list" component={CompanyList} />
                <Route exact path="/dashboard/company/create" component={CompanyCreate} />
                <Route exact path="/dashboard/company/profile" component={CompanyProfile} />
            </div>
        </div>
    );
}