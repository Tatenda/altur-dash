import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { IWidgetProps, IApiFilters, IListItem } from '../../../../_models/queue.model';
import { queueService } from '../../../../_services';
import { Icon, Spin } from 'antd';
import moment from 'moment';
import { groupArrayByKey } from '../../../../_helpers/reusableFunctions';

const LineGraphWidget: React.FC<IWidgetProps> = ({ WidgetTitle, Description, DateRange, shopId, RealTime, status, Data }) => {
    const apiFilter = {} as IApiFilters;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#838383' }} spin />;
    const [graphData, setGraphData] = useState(null as unknown as number[]);
    const [graphLabels, setGraphLabels] = useState([] as string[]);
    const [showSpinner, setSpinner] = useState(false);

    apiFilter.dateObj = DateRange && DateRange;
    apiFilter.status = status;
    apiFilter.shopId = shopId;

    const lineChartOptions = {
        legend: {
            display: true,
            position: 'top',
            labels: {
                fontColor: '#333'
            }
        }
    }
    const lineChartData = {
        labels: graphLabels,
        datasets: [{
            label: 'Monthly Applications',
            backgroundColor: '#111f4d2d',
            borderColor: '#838383',
            data: graphData,
        }]
    }

    // https://stackoverflow.com/a/59767213/2497008
    const getVal = (str: string) => {
        if (str === '12 pm') {
            return 12;
        }
        const [num, ampm] = str.split(' ');
        return (Number)(ampm === 'pm') * 12 + Number(num);
    };

    useEffect(() => {
        // setGraphData(null as unknown as []);
        // setSpinner(true);
        // queueService.filter(apiFilter)
        //     .then(x => x.data.map((itm: IListItem) => {
        //         itm.createdAt = moment(itm.createdAt).format("h a");
        //         return itm;
        //     }))
        //     .then(res => groupArrayByKey(res, 'createdAt'))
        //     .then(groupedData => {
        //         return Object.fromEntries(
        //             // https://stackoverflow.com/a/59767213/2497008
        //             Object.entries(groupedData).sort((a, b) => getVal(a[0]) - getVal(b[0]))
        //         ) as unknown as [string, IListItem[]]
        //     })
        //     .then(sortedObj => {
        //         const labels: string[] = [];
        //         const dt: number[] = [];
        //         Object.entries(sortedObj).map(x => {
        //             labels.push(x[0]);
        //             dt.push(x[1].length);
        //         });
        //         setGraphData(dt);
        //         setGraphLabels(labels);
        //         setSpinner(false);
        //     });
        setGraphLabels(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        setGraphData([63, 72, 70, 42, 81, 55, 78, 99, 121, 95, 113, 72]);
    }, [])

    if (graphData) {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader">
                    <p>Monthly Applications For the Year</p>
                </div>
                <Spin spinning={showSpinner}
                    indicator={antIcon} style={{ color: '#838383' }} tip="Loading..." >
                    <div className="col-12 graphContainerBody">
                        < Line
                            data={lineChartData}
                            options={lineChartOptions}
                            height={240}
                            width={700}
                        />
                    </div>
                </Spin>
            </div>
        );
    } else {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader">
                    <p>Loading...</p>
                </div>
                <div className="col-12 graphContainerBody">
                    <div className="col-12 graphContainerBody">
                        <div className="avgValues col-12">
                            <div className="row">
                                <div className="col spinnerCont py-3">
                                    <Spin indicator={antIcon} style={{ color: '#838383' }} tip="Loading..." />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { LineGraphWidget };
