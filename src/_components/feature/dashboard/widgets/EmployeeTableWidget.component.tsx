import React, { useState, useEffect } from 'react';
import { IWidgetProps, IApiFilters, IListItem } from '../../../../_models/queue.model';
import { queueService } from '../../../../_services';
import { Spin, Icon } from 'antd';
import { getAverageCuttingTime, groupArrayByKey } from '../../../../_helpers/reusableFunctions';
const _ = require('lodash');

interface IEmployeeStats {
    name: string
    numberOfClients: number
    averageServingTime: string
}

const EmployeeTableWidget: React.FC<IWidgetProps> = ({ WidgetTitle, DateRange, shopId, status }) => {
    const [apiData, setData] = useState(null as unknown as IEmployeeStats[]);
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#838383' }} spin />;

    const apiFilter = {} as IApiFilters;
    apiFilter.dateObj = DateRange && DateRange;
    apiFilter.status = status;
    apiFilter.shopId = shopId;

    useEffect(() => {
        setData(null as unknown as []);
        queueService.filter(apiFilter)
            .then(res => groupArrayByKey(res.data, 'servedById'))
            .then(groupedData => {
                const arrData: IEmployeeStats[] = [];
                Object.keys(groupedData).map(key => {
                    arrData.push({
                        name: key,
                        numberOfClients: groupedData[key].length,
                        averageServingTime: getAverageCuttingTime(groupedData[key])
                    } as IEmployeeStats)
                });
                return arrData;
            })
            .then(arrData => {
                setData(arrData);
            }, err => { })
            .finally();
    }, [DateRange, shopId]);

    if (apiData) {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader">
                    <p>{WidgetTitle}</p>
                </div>
                <div className="col-12 graphContainerBody">
                    <div className="col employeeListContainer">
                        <div className="row">
                            <div className="col-12 employeeListContainerHeader">
                                <div className="row">
                                    <div className="col-5 employeeName ">
                                        <p>Name</p>
                                    </div>
                                    <div className="col-3 servedCustomers ">
                                        <p>No. Clients</p>
                                    </div>
                                    <div className="col-4 avgCuttingTime ">
                                        <p>Avg Serving Time</p>
                                    </div>
                                </div>
                            </div>
                            <ul className="row">
                                {
                                    apiData.map(x =>
                                        (x.name && x.name !== 'undefined') &&
                                        <li className='col-12'>
                                            <div className="row">
                                                <div className="col-5 employeeName">
                                                    <p>{x.name}</p>
                                                </div>
                                                <div className="col-3 servedCustomers">
                                                    <p>{x.numberOfClients}</p>
                                                </div>
                                                <div className="col-4 avgCuttingTime">
                                                    <p>{x.averageServingTime}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    } else {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader">
                    <p>Loading...</p>
                </div>
                <div className="col-12 graphContainerBody">
                    <div className="col employeeListContainer">
                        <div className="row">
                            <div className="my-5">
                                <Spin indicator={antIcon} style={{ color: '#838383' }} tip="Loading..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { EmployeeTableWidget };
