/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Tag, Divider, Icon, Tooltip } from 'antd';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';
import { PaginationConfig } from 'antd/lib/table';

const Candidates: React.FC = () => {
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
    const config = {
        bordered: false,
        loading: false,
        pagination: {
            total: 50,
            showTotal: `Total 50 items`,
            pageSize: 8,
            defaultCurrent: 1
        },
        size: 'default',
        expandedRowRender: false,
        title: undefined,
        showHeader: true,
        footer: false,
        rowSelection: {},
        scroll: undefined,
        hasData: true,
        tableLayout: undefined,
    };
    const pagination: PaginationConfig = {
        pageSize: 6,
        defaultCurrent: 1
    };
    return (
        <div className="col-10 jobBody">
            <div className="row">
                <div className="col-12">
                    <div className="containerBody col-12">
                        <div className="col-12 graphContainerHeader">
                            <p>Candidates</p>
                        </div>
                        <div className="col-12 mainBody">
                            <Table
                                dataSource={data}
                                bordered={true}
                                scroll={{ y: 350 }}
                                pagination={pagination}>
                                <Column title="First Name" dataIndex="firstName" key="firstName" />
                                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                                <Column title="Age" dataIndex="age" key="age" />
                                <Column title="Location" dataIndex="location" key="location" />
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
                                    title="Tags"
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
                                {/* <Column
                                    title="Action"
                                    key="action"
                                    render={(text, record: any) => (
                                        <span>
                                            <a>Invite {record.lastName}</a>
                                            <Divider type="vertical" />
                                            <a>Delete</a>
                                        </span>
                                    )}
                                /> */}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Candidates };
