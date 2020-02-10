/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Tag, Icon, Tooltip, Button } from 'antd';
import Column from 'antd/lib/table/Column';
import { PaginationConfig } from 'antd/lib/table';

interface IProps {
    history: any,
    location: any,
    match: any
}

const Candidates: React.FC<IProps> = ({ history, location, match }) => {
    const data = [
        {
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            location: 'Cape Town',
            tags: ['nice', 'developer'],
            status: 'locked'
        },
        {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            location: 'Bloemfontein',
            tags: ['frontend'],
            status: 'locked'
        },
        {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            location: 'Johannesburg',
            tags: ['english', 'teacher'],
            status: 'unlocked'
        }, {
            key: '4',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            location: 'Bloemfontein',
            tags: ['backend', 'developer'],
            status: 'locked'
        },
        {
            key: '5',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            location: 'Johannesburg',
            tags: ['chinese', 'teacher'],
            status: 'unlocked'
        }, {
            key: '6',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            location: 'Bloemfontein',
            tags: ['cleaner'],
            status: 'locked'
        },
        {
            key: '7',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            location: 'Johannesburg',
            tags: ['teacher'],
            status: 'unlocked'
        }, {
            key: '8',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            location: 'Bloemfontein',
            tags: ['developer'],
            status: 'locked'
        },
        {
            key: '9',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            location: 'Johannesburg',
            tags: ['tutor', 'teacher'],
            status: 'unlocked'
        }, {
            key: '10',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            location: 'Bloemfontein',
            tags: ['tutor'],
            status: 'locked'
        },
        {
            key: '11',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            location: 'Johannesburg',
            tags: ['teacher'],
            status: 'unlocked'
        }
    ];

    const viewCandidate = () => {
        history.push(`/dashboard/candidates/1`);
    }

    const pagination: PaginationConfig = {
        pageSize: 6,
        defaultCurrent: 1
    };

    return (
        <div className="col-12">
            <div className="containerBody col-12">
                <div className="col-12 graphContainerHeader">
                    <p>Candidates</p>
                </div>
                <div className="col-12 mainBody">
                    <Table
                        dataSource={data}
                        bordered={true}
                        pagination={pagination}>
                        <Column title="First Name" dataIndex="firstName" key="firstName" />
                        <Column title="Last Name" dataIndex="lastName" key="lastName" />
                        <Column title="Age" dataIndex="age" key="age" />
                        <Column title="Location" dataIndex="location" key="location" />
                        <Column
                            title="Skills"
                            dataIndex="tags"
                            key="tags"
                            render={tags => (
                                <span>
                                    {tags.map((tag: string) => (
                                        <Tag color="blue" key={tag}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </span>
                            )}
                        />
                        <Column
                            title="Status"
                            dataIndex="status"
                            key="status"
                            render={status => (
                                <Tooltip placement="right" title={status === 'locked' ? 'Click to unlock' : 'Unlocked'}>
                                    <Icon
                                        type={status === 'locked' ? 'lock' : 'unlock'}
                                        style={status === 'locked' ? { fontWeight: 'bolder', color: '#e43a19' } : { fontWeight: 'bolder', color: '#12A745' }} />
                                </Tooltip>
                            )} />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record: any) => (
                                <Button
                                    type="ghost"
                                    size="small"
                                    onClick={viewCandidate}
                                    style={{ color: '#e48119', borderColor: '#e48119' }}
                                >View</Button>
                            )}
                        />
                    </Table>
                </div>
            </div>
        </div>
    );
}

export { Candidates };
