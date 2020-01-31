import React from 'react';
import { QueueView } from './queueView.component';
import { FlemojiTv } from './flemojiTv.components';

const FullQueueView: React.FC = () => {
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
