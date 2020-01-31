import React, { useState, useContext } from 'react';
import { authenticationService } from '../../../_services';
import { useGetQueue } from '../../../_hooks/getQueue.hook';
import { Icon, Result, Spin } from 'antd';
import { AppContext } from '../../../_hooks/showHeader.context';

const QueueView: React.FC = () => {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
    const { queue, setQueue, loading, error } = useGetQueue();
    const app = useContext(AppContext);
    const waitingList = queue
        .filter(x => (x.status !== 'cancel' && x.status !== 'absent' && x.status !== 'done'));

    return (
        <div className="row">
            <div className="col-12 queueView">
                <div className="header listHeader col-12">
                    <div className="row">
                        <div className="textContainer col-8">
                            <h2>Waiting List</h2>
                        </div>
                        <div className="logoContainer col-4">
                            <img
                                className="img-fluid"
                                src="/legends-black-60x60.png" alt="" />
                        </div>
                    </div>
                </div>
                {
                    (waitingList.length) ?
                        <ul className="listCont">
                            {
                                waitingList.map(queueItem => (
                                    <li className="col-12" key={queueItem.id}>
                                        <div className="row">
                                            <div className="listIcn col-2">
                                                <Icon type="user" />
                                            </div>
                                            <div className="listName col-8">
                                                <p>{queueItem.user.firstName} {queueItem.user.lastName}</p>
                                            </div>
                                            <div className="listIcn col-2">
                                                <div className="row">
                                                    {
                                                        queueItem.status === 'assign' &&
                                                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                                )}
                        </ul> :
                        <div className="col-12 resultCont">
                            {loading && (<div><Spin size="large" tip="Loading..." /></div>)}
                            {error && <div>'Error..'</div>}
                            {
                                (!loading && !error) &&
                                <Result
                                    icon={<Icon type="smile" style={{ color: '#cccccc', fontSize: '54px' }} />}
                                    title="Empty List!"
                                // extra={<Button type="primary">Next</Button>}
                                />
                            }
                        </div>
                }
            </div>
        </div>
    );
}

export { QueueView };
