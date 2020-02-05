import React, { useEffect, useState } from 'react';
import { jobsService } from '../../../_services';
import { IJobModel } from '../../../_models/jobs.model';
import { Icon, Tag, Button, Table } from 'antd';

interface IProps {
    history: any,
    location: any,
    match: any
}

export const JobsView: React.FC<IProps> = ({ history, location, match }) => {
    const [id] = useState(match.params.id);
    let [job, setJob] = useState({} as unknown as IJobModel);
    const viewCandidate = () => {
        history.push(`/dashboard/jobs/id/${id}/candidate`);
    }
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Surname', dataIndex: 'surname', key: 'surname' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        { title: 'Match', dataIndex: 'match', key: 'match' },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
        {
            title: '',
            dataIndex: 'candidate',
            key: 'candidate',
            render: (candidate: string) => (
                <Button
                    type="ghost"
                    size="small"
                    onClick={viewCandidate}
                    style={{ color: '#e48119', borderColor: '#e48119' }}
                >View</Button>)
        },
    ];

    const data = [];
    for (let i = 0; i < 10; ++i) {
        data.push({
            key: i,
            name: 'Tsholofelo',
            surname: 'Mbalula',
            gender: 'Unknown',
            match: '80%',
            createdAt: '2014-12-24',
            description: 'Maintain the quality management system to ISO 9001 requirement Prepare Quality Assurance policy manuals, ISO mandatory procedures and applicable instructions by using ISO 9001 and business area requirements as guidelines Introduce, document and maintain suitable and effective document management systems into all departments and monitor performance and conformance Evaluate and'
        });
    }

    useEffect(() => {
        jobsService.getJobById(id)
            .then((res: IJobModel) => {
                setJob(res);
            })
    }, [id])

    return (
        <div className="col-12">
            <div className="containerBody col-12">
                <div className="row">
                    <div className="col-4 job-info">
                        <div className="viewJobSectionHead col-12">
                            <div className="row">
                                <div className="col-2 viewJobSectionImg">
                                    <Icon
                                        type="audit"
                                        style={{ fontSize: '32px' }} />
                                </div>
                                <div className="col-10 viewJobSectionTitle">
                                    <p>{job.title}</p>
                                </div>
                            </div>
                        </div>
                        <div className="viewJobSectionTags col-12">
                            {job.keywords &&
                                job.keywords.map(item => {
                                    return (<Tag>
                                        <a href="#">{item}</a>
                                    </Tag>)
                                })
                            }
                        </div>
                        <div className="viewJobSectionDesc col-12">
                            <p>{job.description}</p>
                        </div>
                        <div className="viewJobSectionControls col-12">
                            <Button
                                type="ghost"
                                icon="edit"
                                // loading={this.state.iconLoading}
                                // onClick={this.enterIconLoading}
                                style={{ color: '#e43a19', borderColor: '#e43a19' }}
                            >Edit Job</Button>
                        </div>
                    </div>
                    <div className="col-8 applicants">
                        <Table
                            className="components-table-demo-nested"
                            columns={columns}
                            expandedRowRender={record => (
                                <p style={{ margin: 0 }}>{`${record.description}`}</p>
                            )}
                            dataSource={data}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}