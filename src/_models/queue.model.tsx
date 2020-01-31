import { IUser } from "./client.model";

export class AddToQueueModel {
    shopId: string;
    client: IAddClientToQueue;
    constructor(shopId: string, client: IAddClientToQueue) {
        this.shopId = shopId;
        this.client = client;
    }
}

export interface IApiFilters {
    dateObj: {
        from: string
        to: string
    } | null
    status?: string | null
    shopId?: string | null
    ClientId?: string | null
    servedById?: string | null
    [key: string]: string | undefined | null | object;
}

export interface IAddClientToQueue {
    firstname: string,
    lastname: string,
    phonenumber: string,
    email: string
}

export interface IListItem {
    user: IUser;
    shopId: string;
    id: string;
    createdAt: string;
    servedById: string;
    isServed: boolean;
    status: string;
    timeFinished: string,
    timeAssigned: string
    timeAbsentGone: string,
    timeAbsentBack: string,
    timeCanceled: string,
}

export class UpdateQueueItem {
    id: string;
    servedById: string;
    isServed: boolean;
    status: string;
    constructor(queueItem: IListItem) {
        this.id = queueItem && queueItem.id;
        this.servedById = queueItem && queueItem.servedById;
        this.isServed = queueItem && queueItem.isServed;
        this.status = queueItem && queueItem.status;
    }
}

export interface IWidgetProps {
    WidgetTitle: string
    Description?: string | null
    DateRange: {
        from: string
        to: string
    } | null
    shopId: string
    RealTime?: boolean | null
    Data?: {} | null
    status?: string | null
}
