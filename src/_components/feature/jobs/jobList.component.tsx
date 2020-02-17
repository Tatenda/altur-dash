import React, { useEffect, useState } from 'react';
import { Icon, Button, Tooltip } from 'antd';
import { jobsService } from '../../../_services';
import { IJobModel } from '../../../_models/jobs.model';
import { history } from '../../../_helpers';

export const JobList: React.FC = () => {
    let [jobs, setJobs] = useState(null as unknown as IJobModel[]);

    useEffect(() => {
        jobsService.getJobs().then(res => {
            setJobs(res);
        })
    }, []);

    const viewJob = (id: string) => {
        history.push(`/dashboard/jobs/id/${id}`);
    }

    const deleteJob = (id: string) => {
        jobsService.deleteJob(id)
            .then(res => {
                console.log(res);
            })
    }

    if (jobs) {
        return (
            <div className="col-12">
                <div className="containerBody col-12">
                    <div className="col-12 graphContainerHeader">
                        <p>List Jobs</p>
                    </div>
                    <div className="col-12 mainBody">
                        {(jobs.length) ?
                            <ul className="listCont" style={{ overflow: 'hidden' }}>
                                {jobs.map((job: IJobModel) => {
                                    return (
                                        <li key={job.id}>
                                            <div className='row'>
                                                <div className="listIcn col-1">
                                                    <Icon type="profile" />
                                                </div>
                                                <div className='listName col-8'>
                                                    <p>
                                                        {job.title}, <span>{job.location}</span>
                                                    </p>
                                                </div>
                                                <div className='col-3 btnOptions'>
                                                    <div className="row">
                                                        <div className='col-4 btnCont'>
                                                            <Tooltip placement="right" title="View Job">
                                                                <Button
                                                                    shape="circle"
                                                                    icon="folder-open"
                                                                    type="ghost"
                                                                    onClick={() => { viewJob(job.id) }}
                                                                    style={{ color: '#12A745', border: 'none' }} />
                                                            </Tooltip>
                                                        </div>
                                                        <div className='col-4 btnCont'>
                                                            <Tooltip placement="right" title="Edit Job">
                                                                <Button
                                                                    shape="circle"
                                                                    icon="edit"
                                                                    type="ghost"
                                                                    style={{ color: '#111f4d', border: 'none' }} />
                                                            </Tooltip>
                                                        </div>

                                                        <div className='col-4 btnCont'>
                                                            <Tooltip placement="right" title="Delete Job">
                                                                <Button
                                                                    shape="circle"
                                                                    icon="delete"
                                                                    type="ghost"
                                                                    onClick={() => { deleteJob(job.id) }}
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
                            </ul> : <div>No Jobs</div>
                        }
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div className="col-12">
            <div className="containerBody col-12">
                <div className="col-12 graphContainerHeader">
                    <p>Loading Jobs...</p>
                </div>
                <div className="col-12 mainBody">
                    Loading...
                </div>
            </div>
        </div>
        );
    }
}