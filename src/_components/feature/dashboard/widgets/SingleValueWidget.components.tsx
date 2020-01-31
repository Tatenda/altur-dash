import React, { useState, useEffect } from 'react';
import { Icon, Spin } from 'antd';
import { queueService } from '../../../../_services';
import { IApiFilters, IWidgetProps } from '../../../../_models/queue.model';

const SingleValueWidget: React.FC<IWidgetProps> = ({ WidgetTitle, Description, DateRange, shopId, RealTime, status, Data }) => {
    const [apiData, setData] = useState(null as unknown as []);
    const apiFilter = {} as IApiFilters;
    apiFilter.dateObj = DateRange && DateRange;
    apiFilter.status = status;
    apiFilter.shopId = shopId;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#838383' }} spin />;
    // apiFilter.servedById = '12342455224';

    useEffect(() => {
        // setData(null as unknown as []);
        // queueService.filter(apiFilter)
        //     .then(res => {
        //         setData(res.data);
        //     }, err => { })
        //     .finally();
    }, [DateRange, shopId]);

    if (apiData) {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader singleValueHead">
                    <p>{WidgetTitle}</p>
                </div>
                <div className="col-12 graphContainerBody">
                    <div className="col-12 singleValueIcon">
                        <Icon type="user" />
                    </div>
                    <div className="col-12 singleValueTxt text-center">
                        <p>1219 Applications</p>
                    </div>
                    <div className="col-12 singleValueDesc text-center">
                        <div className="row">
                            <Icon type="number" style={{ fontSize: '150px', color: '#f2f4f7' }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="graphContainer col-12">
                <div className="col-12 graphContainerHeader singleValueHead">
                    <p>{WidgetTitle}</p>
                </div>
                <div className="col-12 graphContainerBody">
                    <div className="col-12 singleValueIcon">
                        <Icon type="user" />
                    </div>
                    <div className="col-12 singleValueTxt text-center">
                        <p>1219 Applications</p>
                    </div>
                    <div className="col-12 singleValueDesc text-center">
                        <div className="row">
                            <Icon type="number" style={{ fontSize: '150px', color: '#f2f4f7' }} />
                        </div>
                    </div>
                </div>
            </div>
            // <div className="graphContainer col-12">
            //     <div className="col-12 graphContainerHeader singleValueHead">
            //         <p>Loading...</p>
            //     </div>
            //     <div className="col-12 graphContainerBody">
            //         <div className="col-12 singleValueTxt text-center">
            //             <div className="my-5">
            //                 <Spin indicator={antIcon} style={{ color: '#838383' }} tip="Loading..." />
            //             </div>
            //         </div>
            //         <div className="col-12 singleValueDesc text-center">
            //             <div className="row">
            //                 <Icon type="number" style={{ fontSize: '150px', color: '#f2f4f7' }} />
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export { SingleValueWidget };


