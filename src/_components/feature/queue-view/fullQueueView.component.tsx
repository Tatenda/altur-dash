import React, { useState, useEffect, useContext } from 'react';
import { QueueView } from './queueView.component';
import { FlemojiTv } from './flemojiTv.components';
import { Header } from '../..';
import { IListItem } from '../../../_models/queue.model';
import { AppContext } from '../../../_hooks/showHeader.context';
import { notification, Icon } from 'antd';

const FullQueueView: React.FC = () => {
    const app = useContext(AppContext);

    app.socket.on("onNotify", () => {
        console.log('on notify');
        notification.open({
            message: 'Who\'s Next!',
            description:
                'We just finished with a client. May the next inline get ready.',
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-9"><FlemojiTv /></div>
                <div className="col-3"><QueueView /></div>
            </div>
        </div>
    );
}

export { FullQueueView };
