import { IListItem } from "../_models/queue.model";
import moment from 'moment'
const renderHTML = require('react-render-html');
const _ = require('lodash');

export const getAverageWaitingTime = (queue: IListItem[]): string => {
    if (!queue.filter(x => (x.status === 'assign' || x.status === 'done')).length) {
        return '- -';
    }
    const totalMinutes = queue
        .filter(x => (x.status === 'assign' || x.status === 'done'))
        .reduce((totalTime, queueItem): number => {
            totalTime += moment(queueItem.timeAssigned)
                .diff(queueItem.createdAt, 'minutes');
            return totalTime;
        }, 0);
    const avg = totalMinutes / queue.filter(x => x.status === 'assign' || x.status === 'done').length;
    return renderHTML((avg > 60) ? `<p>${Math.floor(avg / 60)}<span>h</span> ${Math.ceil(avg % 60)}<span>m</span></p>` : `<p>${Math.ceil(avg)}<span>m</span></p>`)
}

export const getAverageCuttingTime = (queue: IListItem[]): string => {
    if (!queue.filter(x => x.status === 'done').length) {
        return '- -';
    }
    const totalMinutes = queue
        .filter(x => x.status === 'done')
        .reduce((totalTime, queueItem): number => {
            totalTime += moment(queueItem.timeFinished)
                .diff(queueItem.timeAssigned, 'minutes');
            return totalTime;
        }, 0);
    const avg = totalMinutes / queue.filter(x => x.status === 'done').length;
    return renderHTML((avg > 60) ? `<p>${Math.floor(avg / 60)}<span>h</span> ${Math.ceil(avg % 60)}<span>m</span></p>` : `<p>${Math.ceil(avg)}<span>m</span></p>`)
}

export const groupArrayByKey = (arr: any[], key: string): any => {
    return _.mapValues(_.groupBy(arr, key),
        (clist: any) => clist.map((x: any) => _.omit(x, '')));
}
