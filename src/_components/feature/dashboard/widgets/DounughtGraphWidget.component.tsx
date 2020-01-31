import React, { useState, useEffect } from 'react';
import { Icon, Spin } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { IWidgetProps, IListItem, IApiFilters } from '../../../../_models/queue.model';
import { queueService } from '../../../../_services';

const DounughtGraphWidget: React.FC<IWidgetProps> = ({ WidgetTitle, Description, DateRange, shopId, RealTime, status, Data }) => {
    const apiFilter = {} as IApiFilters;
    const [apiData, setData] = useState(null as unknown as number[]);
    const [percentCancelled, setPercentCancelled] = useState(0);
    const [percentServed, setPercentServed] = useState(0);
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#838383' }} spin />;
    const [showSpinner, setSpinner] = useState(false);
    apiFilter.dateObj = DateRange && DateRange;
    apiFilter.status = status;
    apiFilter.shopId = shopId;

    const pieChartData = {
        labels: ["Served", "Cancelled", 'Other'],
        datasets: [{
            data: apiData,
            backgroundColor: ['#838383', '#111f4df1', '#111f4d2d'],
            borderColor: ['#838383', '#111f4df1', '#111f4d2d'],
        }],
    }

    const pieChartOptions = {
        cutoutPercentage: 90,
        title: {
            display: true,
            text: `${WidgetTitle} Clients`
        },
        legend: {
            position: 'left',
            labels: {
                boxWidth: 15,
                padding: 20
            }
        }
    }

    useEffect(() => {
        // setSpinner(true);
        // queueService.filter(apiFilter)
        //     .then(res => {
        //         if (res) {
        //             const numArr: number[] = []
        //             numArr.push(res.data.filter((x: IListItem) => x.status === 'done').length);
        //             numArr.push(res.data.filter((x: IListItem) => x.status === 'cancel').length);
        //             numArr.push(res.data.filter((x: IListItem) => (x.status !== 'cancel' && x.status !== 'done')).length);
        //             setData(numArr);
        //             setPercentCancelled(Math.floor((numArr[1] / res.data.length) * 100));
        //             setPercentServed(Math.floor((numArr[0] / res.data.length) * 100));
        //             setSpinner(false);
        //         }
        //     });
        setData([546, 467, 120]);
        setPercentCancelled(67);
        setPercentServed(32);
    }, [apiFilter])

    if (apiData) {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader">
                    <p>{WidgetTitle}</p>
                </div>
                <Spin spinning={showSpinner}
                    indicator={antIcon} style={{ color: '#838383' }} tip="Loading..." >
                    <div className="col-12 graphContainerBody">
                        < Doughnut
                            data={pieChartData}
                            options={pieChartOptions}
                        />
                        <div className="col-12 graphSummary">
                            <p className="col">
                                <span className="row">
                                    <span className="col-1">
                                        <Icon type="pie-chart" />
                                    </span>
                                    <span className="col">
                                        {percentCancelled}% of people registered were canceled without being served</span>
                                </span>
                            </p>
                            <p className="col">
                                <div className="row">
                                    <div className="col-1">
                                        <Icon type="pie-chart" />
                                    </div>
                                    <div className="col">{percentServed}% of people registered were served</div>
                                </div>
                            </p>
                        </div>
                    </div>
                </Spin>
            </div>
        );
    } else {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader">
                    <p>{WidgetTitle}</p>
                </div>
                <Spin spinning={showSpinner}
                    indicator={antIcon} style={{ color: '#838383' }} tip="Loading..." >
                    <div className="col-12 graphContainerBody">
                        < Doughnut
                            data={pieChartData}
                            options={pieChartOptions}
                        />
                        <div className="col-12 graphSummary">
                            <p className="col">
                                <span className="row">
                                    <span className="col-1">
                                        <Icon type="pie-chart" />
                                    </span>
                                    <span className="col">
                                        {percentCancelled}% of people registered were canceled without being served</span>
                                </span>
                            </p>
                            <p className="col">
                                <div className="row">
                                    <div className="col-1">
                                        <Icon type="pie-chart" />
                                    </div>
                                    <div className="col">{percentServed}% of people registered were served</div>
                                </div>
                            </p>
                        </div>
                    </div>
                </Spin>
            </div>
            // <div className="graphContainer col-12">
            //     <div className="col-12 graphContainerHeader">
            //         <p>Loading...</p>
            //     </div>
            //     <div className="col-12 graphContainerBody">
            //         <div className="avgValues col-12">
            //             <div className="row">
            //                 <div className="col spinnerCont py-3">
            //                     <Spin indicator={antIcon} style={{ color: '#838383' }} tip="Loading..." />
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export { DounughtGraphWidget };


