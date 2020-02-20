import React, { useEffect, FC, useState } from 'react';
import './style.scss';
import { Icon, Tabs, Tag } from 'antd';
import { JobListItem } from './jobListItem.component';
import { companyService } from '../../../_services/company.service';
import { ICompanyModel } from '../../../_models/company.model';
const { TabPane } = Tabs;

interface IProps {
    match: any;
}

export const CompanyProfile: FC<IProps> = ({ match }) => {
    const [Company, setCompany] = useState(null as unknown as ICompanyModel);
    const id = match.params.id;

    useEffect(() => {
        companyService.getCompanyById(id)
            .then((res: ICompanyModel) => {
                setCompany(res);
            })
    }, [id])

    useEffect(() => {
        companyService.getCompanyJobs(id)
            .then((res: any) => {
                console.log(res);
            }, error => console.log(error))
    }, [id])

    return (
        <div className="col-12">
            <div className="containerBody col-12">
                {
                    Company ?
                        <div className="col-12 companyContainerBody mt-3">
                            <div className="row">
                                <div className="col-12 companyInfo">
                                    <div className="row">
                                        <div className="col-2 logoCont">
                                            <img className="img-fluid" src="/mmogologo.png" alt="" />
                                        </div>
                                        <div className="col-7 detailsCont">
                                            <div className="detailsContName col-12"><p >{Company.title} <Tag color="volcano">{Company.category.title}</Tag></p></div>
                                            <div className="detailsContCity col-12"><p>{Company.city}, {Company.province}</p></div>
                                            <div className="detailsContContact col-12">
                                                <div className="row">
                                                    <div className="col-1">
                                                        <Icon type="phone" onClick={() => {
                                                            companyService.getCompanyJobs(id)
                                                                .then((res: any) => {
                                                                    console.log(res);
                                                                }, error => console.log(error))
                                                        }} />
                                                    </div>
                                                    <div className="col-1">
                                                        <Icon type="mail" />
                                                    </div>
                                                    <div className="col-1">
                                                        <Icon type="linkedin" />
                                                    </div>
                                                    <div className="col">
                                                        <p>{Company.website}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 tagsCont p-1">
                                            <div>
                                                {
                                                    Company.keywords.map(x => <Tag key={x} color="#12A745" style={{ display: 'inline-block' }}>{x}</Tag>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 companyJobs">
                                    <Tabs defaultActiveKey="1">
                                        <TabPane
                                            tab={<span><Icon type="check-circle" /> Open Jobs</span>}
                                            key="1"
                                        >
                                            <ul >
                                                <JobListItem />
                                                <JobListItem />
                                                <JobListItem />
                                            </ul>
                                        </TabPane>
                                        <TabPane
                                            tab={<span><Icon type="minus-circle" /> Closed Jobs</span>}
                                            key="2"
                                        >
                                            <ul >
                                                <JobListItem />
                                                <JobListItem />
                                                <JobListItem />
                                            </ul>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        </div> :
                        <div>Loading...</div>
                }
            </div>
        </div>
    );
}