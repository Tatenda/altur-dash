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
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Surname', dataIndex: 'surname', key: 'surname' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        { title: 'Match', dataIndex: 'match', key: 'match' },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    ];

    const data = [];
    for (let i = 0; i < 10; ++i) {
        data.push({
            key: i,
            name: 'Tsholofelo',
            surname: 'Mbalula',
            gender: 'Unknown',
            match: '80%',
            createdAt: '2014-12-24 23:12:00',
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
                            expandedRowRender={record => <p style={{ margin: 0 }}>{`${record.name} ${record.surname}`}</p>}
                            dataSource={data}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}