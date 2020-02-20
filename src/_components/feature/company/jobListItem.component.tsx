import React, { useState } from 'react';
import { Icon, Tooltip, Popconfirm } from 'antd';

export const JobListItem = () => {
    const [visible, setvisible] = useState(false);

    const handleConfirm = () => {

    }
    const handleCancel = () => {

    }
    return (
        <li className="col-12 mb-2">
            <div className="row">
                <div className="col-1 jobListIcn">
                    <Icon style={{ fontSize: '18px', fontWeight: 'bolder' }} type="profile" />
                </div>
                <div className="col-7 jobListName">
                    <p>BSc Eng graduate with 0-2 yrs experience</p>
                </div>
                <div className="col-4 jobListAction">
                    <div className="row">
                        <div className="col-3 actionIcnCont">
                            <Tooltip title="View Job">
                                <Icon style={{ fontSize: '16px', color: "#111f4d", cursor: 'pointer' }} type="eye" />
                            </Tooltip>
                        </div>
                        <div className="col-3 actionIcnCont">
                            <Tooltip title="Close Job">
                                <Icon style={{ fontSize: '16px', color: "#e48119", cursor: 'pointer' }} type="clock-circle" />
                            </Tooltip>
                        </div>
                        <div className="col-3 actionIcnCont">
                            <Tooltip title="Edit Job">
                                <Icon style={{ fontSize: '16px', color: "#12A745", cursor: 'pointer' }} type="edit" />
                            </Tooltip>
                        </div>
                        <div className="col-3 actionIcnCont">
                            <Tooltip title="Delete Job">
                                <Popconfirm
                                    title="Are you sure delete this task?"
                                    visible={visible}
                                    onVisibleChange={() => setvisible(!visible)}
                                    onConfirm={handleConfirm}
                                    onCancel={handleCancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Icon style={{ fontSize: '16px', color: '#e43a19', cursor: 'pointer' }} type="delete" />
                                </Popconfirm>
                            </Tooltip>
                        </div>
                    </div>

                </div>
            </div>
        </li>
    );
}