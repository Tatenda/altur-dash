import React, { useEffect } from 'react';
import { IListItem } from '../../../_models/queue.model';
import { useGetQueue } from '../../../_hooks/getQueue.hook';
import { ListItem } from './ListItem.component';
import { Icon, Button, Dropdown, Menu, Result, message, Spin } from 'antd';
import { queueService } from '../../../_services';

const ApplicationsList: React.FC = () => {
    const { queue, loading, error } = useGetQueue();
    const queueList = queue
        .filter(x => (x.status !== 'cancel' &&
            x.status !== 'done' &&
            x.status !== 'absent'));

    function handleMenuClick(e: any) {
        message.loading({ content: 'Processing request...' }, 2);
        const strArr = e.key.split('-');
        if (strArr[0] === "r") {
            const item = queue.find(x => x.id === strArr[1]) as IListItem;
            item.status = 'restore';
            queueService.updateStatus(item)
                .then(res => {
                    message.success({ content: 'Restore successful', duration: 2 });
                }, err => {
                    message.error({ content: 'Error Occured', duration: 2 });
                }).finally();
        }
        if (strArr[0] === 'c') {
            const item = queue.find(x => x.id === strArr[1]) as IListItem;
            item.status = 'cancel';
            queueService.updateStatus(item)
                .then(res => {
                    message.success({ content: 'Cancel successful', duration: 2 });
                }, err => {
                    message.error({ content: 'Error Occured', duration: 2 });
                }).finally();
        }
    }

    useEffect(() => { })

    return (
        <div className="row">
            <div className="col-8 queueView manageQuewView">
                <div className="header listHeader col-12">
                    <div className="row">
                        <div className="textContainer col-8">
                            <h2>Applications</h2>
                        </div>
                    </div>
                </div>
                {
                    // (queueList && queueList.length) ?
                    <ul className="listCont">
                        <ListItem listItem={{} as IListItem} />
                        <ListItem listItem={{} as IListItem} />
                        {queueList.map(listItem => <ListItem listItem={listItem} />)}
                    </ul>
                    // :
                    // <div className="col-12 resultCont">
                    //     {loading && <div><Spin size="large" tip="Loading..." /></div>}
                    //     {error && <div>'Error..'</div>}
                    //     {
                    //         (!loading && !error) && <Result
                    //             icon={<Icon type="smile" style={{ color: '#cccccc' }} />}
                    //             title="Great, our customer list is empty!"
                    //         />
                    //     }
                    // </div>
                }
            </div>
            <div className="col-4 statsSection">
                {/* <div className="row"> */}
                <div className="col-12 absentList">
                    <div className="col-12 absentListCont">
                        <div className="statsSectionHead col-12">
                            <div className="row">
                                <div className="col-1 statsSectionHeadIcn">
                                    <Icon type="question-circle" style={{ fontSize: '12px' }} />
                                </div>
                                <div className="col statsSectionHeadTxt">
                                    <p className="mb-0">Absent</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 statsSectionBody">
                            {
                                queue.filter(x => x.status === 'absent').length ?
                                    <ul className="row absent">
                                        {
                                            queue
                                                .filter(x => x.status === 'absent')
                                                .map(queueItem => {
                                                    return (<li className="col-12">
                                                        <div className="row">
                                                            <div className="col-1 absentIcon">
                                                                <div className="row">
                                                                    <Icon type="user" style={{ fontSize: '12px' }} />
                                                                </div>
                                                            </div>
                                                            <div className="col-7 absentName">
                                                                <p>{queueItem.user.firstName} {queueItem.user.lastName}</p>
                                                            </div>
                                                            <div className="col absentBtn">
                                                                <div className="row">
                                                                    <div className="col-6 absentBtnCont">
                                                                        <Dropdown overlay={
                                                                            <Menu onClick={handleMenuClick}>
                                                                                <Menu.Item key={`r-${queueItem.id}`}>Restore</Menu.Item>
                                                                                <Menu.Item key={`c-${queueItem.id}`}>Cancel</Menu.Item>
                                                                            </Menu>}>
                                                                            <Button size="small">
                                                                                Actions <Icon type="down" />
                                                                            </Button>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>)
                                                })
                                        }
                                    </ul> :
                                    <div className="col-12 resultCont">
                                        {loading && <div><Spin tip="Loading..." /></div>}
                                        {error && <div>'Error..'</div>}
                                        {
                                            (!loading && !error) &&
                                            <Result
                                                icon={<Icon type="smile" style={{ color: '#cccccc', fontSize: '54px' }} />}
                                                title="No one is absent!"
                                            />
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12 statsDisplay">
                    <div className="col-12 statsDisplayCont">
                        <div className="statsSectionHead col-12">
                            <div className="row">
                                <div className="col-1 statsSectionHeadIcn">
                                    <Icon type="line-chart" style={{ fontSize: '12px' }} />
                                </div>
                                <div className="col statsSectionHeadTxt">
                                    <p className="mb-0">Quick Stats</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 statsSectionBody">
                            <ul className="row quickStats">
                                <li className="col-6">
                                    <div className="col-12 statItem">
                                        <div className="row">
                                            <div className="col-12 itemValue green">
                                                <p>{queue.length}</p>
                                            </div>
                                            <div className="col-12 itemName text-center">
                                                <p>Total Registered</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-6">
                                    <div className="col-12 statItem">
                                        <div className="row">
                                            <div className="col-12 itemValue orange">
                                                <p></p>
                                            </div>
                                            <div className="col-12 itemName text-center">
                                                <p>Average Waiting Time</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-6">
                                    <div className="col-12 statItem">
                                        <div className="row">
                                            <div className="col-12 itemValue red">
                                                <p></p>
                                            </div>
                                            <div className="col-12 itemName text-center">
                                                <p>Average Cutting Time</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-6">
                                    <div className="col-12 statItem">
                                        <div className="row">
                                            <div className="col-12 itemValue">
                                                <p>{queue.filter(x => x.status === 'cancel').length}</p>
                                            </div>
                                            <div className="col-12 itemName text-center">
                                                <p>Total Cancelled</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>

    );

}

export { ApplicationsList };
