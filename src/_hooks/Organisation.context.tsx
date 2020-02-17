import React from 'react';
import { IOrganisation } from '../_models/organisation.model';

const Organisation = {} as IOrganisation;

const OrganisationContext = React.createContext({
    organisationState: Organisation,
    dispatch: {} as any
});

const reducer = (state: IOrganisation, action: IOrganisation): IOrganisation => {
    return action;
};

export { OrganisationContext, Organisation, reducer };
