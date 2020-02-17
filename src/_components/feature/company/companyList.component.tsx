import React, { useEffect, useState } from 'react';
import { ICompanyModel } from '../../../_models/company.model';
import { companyService } from '../../../_services/company.service';
import { Icon, Tooltip, Button } from 'antd';
import { history } from '../../../_helpers';

export const CompanyList = () => {
    let [companies, setCompanies] = useState(null as unknown as ICompanyModel[]);

    useEffect(() => {
        companyService.getCompany().then(res => {
            setCompanies(res);
        })
    }, []);

    const editCompany = (id: string) => {
        // history.push(`/dashboard/companies/id/${id}`);
    }

    const viewCompany = (id: string) => {
        console.log('view company');

        history.push(`/dashboard/company/${id}/profile`);
    }

    const deleteCompany = (id: string) => {
        companyService.deleteCompany(id)
            .then(res => {
                console.log(res);
            })
    }

    if (companies) {
        return (
            <div className="col-12">
                <div className="containerBody col-12">
                    <div className="col-12 graphContainerHeader">
                        <p>List Companies</p>
                    </div>
                    <div className="col-12 mainBody">
                        {(companies.length) ?
                            <ul className="listCont" style={{ overflow: 'hidden' }}>
                                {companies.map((company: ICompanyModel) => {
                                    return (
                                        <li key={company.id}>
                                            <div className='row'>
                                                <div className="listIcn col-1">
                                                    <Icon type="profile" />
                                                </div>
                                                <div className='listName col-8'>
                                                    <p>
                                                        {company.title} <span></span>
                                                    </p>
                                                </div>
                                                <div className='col-3 btnOptions'>
                                                    <div className="row">
                                                        <div className='col-4 btnCont'>
                                                            <Tooltip placement="right" title="View Company">
                                                                <Button
                                                                    shape="circle"
                                                                    icon="folder-open"
                                                                    type="ghost"
                                                                    onClick={() => { viewCompany(company.id) }}
                                                                    style={{ color: '#12A745', border: 'none' }} />
                                                            </Tooltip>
                                                        </div>
                                                        <div className='col-4 btnCont'>
                                                            <Tooltip placement="right" title="Edit Company">
                                                                <Button
                                                                    shape="circle"
                                                                    icon="edit"
                                                                    type="ghost"
                                                                    onClick={() => { editCompany(company.id) }}
                                                                    style={{ color: '#111f4d', border: 'none' }} />
                                                            </Tooltip>
                                                        </div>

                                                        <div className='col-4 btnCont'>
                                                            <Tooltip placement="right" title="Delete Company">
                                                                <Button
                                                                    shape="circle"
                                                                    icon="delete"
                                                                    type="ghost"
                                                                    onClick={() => { deleteCompany(company.id) }}
                                                                    style={{ color: '#e43a19', border: 'none' }} />
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                                }
                            </ul> : <div>No Companies</div>
                        }
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div className="col-12">
            <div className="containerBody col-12">
                <div className="col-12 graphContainerHeader">
                    <p>Loading Companies...</p>
                </div>
                <div className="col-12 mainBody">
                    Loading...
                </div>
            </div>
        </div>
        );
    }
}