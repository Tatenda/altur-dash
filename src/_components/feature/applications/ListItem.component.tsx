import React, { useState } from 'react';
import { Button, Icon } from 'antd';
import { IListItem } from '../../../_models/queue.model';
import { queueService } from '../../../_services';

interface IProps {
    listItem: IListItem
}

const BtnState = {
    loading: false,
    action: ''
}

export const ListItem: React.FC<IProps> = ({ listItem }) => {
    const [btnState, setBtnState] = useState(BtnState)
    let barber = '';

    function onClickAssign() {
        if (barber.trim().length) {
            changeState('assign');
            listItem.servedById = barber;
            listItem.status = 'assign';
            queueService.assignBarber(listItem)
                .then(res => {
                }, err => {
                }).finally(() => changeState());
        } else {
            //throw no selected barber error
        }
    }

    function onClickReAssign() {
        listItem.servedById = '';
        listItem.status = '';
        changeState('re-assign');
        queueService.assignBarber(listItem)
            .then(res => {
            }, err => {
            }).finally(() => changeState());
    }

    function onClickAbsent() {
        changeState('absent');
        listItem.status = 'absent';
        queueService.updateStatus(listItem)
            .then(res => {
            }, err => {
            }).finally(() => changeState());
    }

    function onClickDone() {
        if (listItem.timeAssigned) {
            changeState('done');
            listItem.status = 'done';
            queueService.updateStatus(listItem)
                .then(res => {
                }, err => {
                }).finally(() => changeState());
        } else {
            //throw no selected barber error
        }
    }

    function onClickCancel() {
        changeState('cancel');
        listItem.status = 'cancel';
        queueService.updateStatus(listItem)
            .then(res => {
            }, err => {
            }).finally(() => changeState());
    }

    const changeState = (action = '') => {
        setBtnState({
            loading: action.length ? true : false,
            action: action
        })
    }

    function handleChange(value: string) {
        barber = value;
    }

    return (
        <li className='col-12' key={listItem.id}>
            <div className='row'>
                <div className="listIcn col-1">
                    <Icon type="user" />
                </div>
                <div className='listName col-7'>
                    <p>
                        {/* {listItem.user.firstName} {listItem.user.lastName} */}
                        Tatenda Makunike, <span>Johannesburg</span>
                    </p>
                </div>
                <div className='col-4'>
                    <div className='row'>
                        {
                            listItem.status !== 'assign' &&
                            <div className='col-6 btnCont'>
                                <Button type="primary"
                                    loading={btnState.loading && btnState.action === 'assign'}
                                    onClick={onClickAssign} block
                                    style={{ background: "#12A745", border: 'none' }}>
                                    Accept
                            </Button>
                            </div>
                        }
                        {
                            listItem.status !== 'assign' &&
                            <div className='col-6 btnCont'>
                                <Button type='primary'
                                    loading={btnState.loading && btnState.action === 'cancel'}
                                    onClick={onClickCancel} block
                                    style={{ background: "#e43a19", border: 'none' }}>
                                    Reject
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </li>
    )
}
