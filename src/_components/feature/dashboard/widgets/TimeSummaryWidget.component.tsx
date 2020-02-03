import React, { useEffect, useState } from 'react';
import { Icon, Spin } from 'antd';
import { IWidgetProps, IListItem, IApiFilters } from '../../../../_models/queue.model';
import { queueService } from '../../../../_services';

interface IProps extends IWidgetProps {
    GetResults: (x: IListItem[]) => string
}

const TimeSummaryWidget: React.FC<IProps> = ({ WidgetTitle, Description, DateRange, shopId, RealTime, status, Data, GetResults }) => {
    const apiFilter = {} as IApiFilters;
    const [apiData, setData] = useState(null as unknown as IListItem[]);
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#838383' }} spin />;
    apiFilter.dateObj = DateRange && DateRange;
    apiFilter.status = status;
    apiFilter.shopId = shopId;
    // apiFilter.servedById = '12342455224';

    // useEffect(() => {
    //     // setData(null as unknown as []);
    //     // queueService.filter(apiFilter)
    //     //     .then(res => {
    //     //         setData(res.data);
    //     //     }, err => { })
    //     //     .finally();
    // }, [DateRange, shopId]);

    if (apiData) {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader">
                    <p>{WidgetTitle}</p>
                </div>
                <div className="col-12 graphContainerBody">
                    <div className="avgValues col-12">
                        <div className="row">
                            <div className="col-4 avgValuesIcn">
                                <Icon type="clock-circle" style={{ fontSize: '32px', color: '#838383' }} theme="outlined" />
                            </div>
                            <div className="col avgValuesTxt">
                                {
                                    GetResults(apiData)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 avgSummary text-center">
                        <p>{Description}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader">
                    <p>{WidgetTitle}</p>
                </div>
                <div className="col-12 graphContainerBody">
                    <div className="avgValues col-12">
                        <div className="row">
                            <div className="col-4 avgValuesIcn">
                                <Icon type="clock-circle" style={{ fontSize: '32px', color: '#838383' }} theme="outlined" />
                            </div>
                            <div className="col avgValuesTxt">
                                {
                                    // GetResults(apiData)
                                    <p>67<span>%</span></p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 avgSummary text-center">
                        <p>{Description}</p>
                    </div>
                </div>
            </div>
            // <div className="graphContainer col-12">
            //     <div className="col-12 graphContainerHeader">
            //         <p>Loading...</p>
            //     </div>
            //     <div className="col-12 graphContainerBody">
            //         <div className="col-12 graphContainerBody">
            //             <div className="avgValues col-12">
            //                 <div className="row">
            //                     <div className="col spinnerCont py-3">
            //                         <Spin indicator={antIcon} style={{ color: '#838383' }} tip="Loading..." />
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div className="col-12 avgSummary text-center">
            //             <p></p>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export { TimeSummaryWidget };


