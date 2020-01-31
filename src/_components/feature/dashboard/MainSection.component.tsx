import React, { useState } from 'react';
import { Dropdown, Menu, Icon, DatePicker } from 'antd';
import moment from 'moment'
import { LineGraphWidget, TimeSummaryWidget, DounughtGraphWidget, SingleValueWidget } from './widgets';
import { getAverageWaitingTime, getAverageCuttingTime } from '../../../_helpers/reusableFunctions';


const { RangePicker } = DatePicker;

const MainSection: React.FC = () => {
    const [dateRangeState, setDateRangeState] = useState(null as unknown as { from: string, to: string });

    const handleMenuClick = (e: any) => {
        if (e.key === '3') {
        }
    };

    const onDateChange = (dates: any, dateStrings: any) => {
        setDateRangeState({ from: dateStrings[0], to: dateStrings[1] });
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">All</Menu.Item>
            <Menu.Item key="3">Accepted</Menu.Item>
            <Menu.Item key="2">Rejected</Menu.Item>
        </Menu>
    )

    return (
        <div className="row">
            <div className="col-8 dashboardMainSection">
                <div className="col-12 sectionHeader">
                    <div className="row">
                        <div className="col-1 menuIcon">
                            <Dropdown overlay={menu} placement="bottomRight">
                                <Icon type="more" />
                            </Dropdown>
                        </div>
                        <div className="col-7 headerMainArea">
                            <p>All</p>
                        </div>
                        <div className="col dateRange">
                            <RangePicker
                                ranges={{
                                    Today: [moment(), moment()],
                                    'This Week': [moment().startOf('week'), moment().endOf('week')],
                                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    'This Year': [moment().startOf('year'), moment().endOf('year')],
                                }}
                                onChange={onDateChange}
                                size="small"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 sectionBody">
                        <div className="row">
                            <div className="col-12  ">
                                <LineGraphWidget DateRange={dateRangeState} shopId="1"
                                    WidgetTitle='Monthly Applications' />
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-4">
                                        <SingleValueWidget WidgetTitle="Total Applications"
                                            shopId="1" Description="Total Job Applications Received" status={null}
                                            DateRange={dateRangeState} Data={null} />
                                    </div>
                                    <div className="col-4">
                                        <SingleValueWidget WidgetTitle="Applications Shortlisted"
                                            shopId="1" Description="" status={'done'}
                                            DateRange={dateRangeState} Data={null} />
                                    </div>
                                    <div className="col-4">
                                        <SingleValueWidget WidgetTitle="Rejected Applications"
                                            shopId="1" Description="" status={'done'}
                                            DateRange={dateRangeState} Data={null} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4 dashboardSideBar">
                <div className="row">
                    <div className="col-12 sectionBody">
                        <div className="row">
                            <div className="col-12">
                                <DounughtGraphWidget
                                    DateRange={dateRangeState} shopId="1"
                                    WidgetTitle='Accepted vs Rejected'
                                />
                            </div>
                            <div className="col-12">
                                <TimeSummaryWidget DateRange = {dateRangeState} shopId="1"
                                    WidgetTitle='Average Rejected'
                                    Description='The average amount of rejected applications 
                                    compared to the total applications made'
                                                status={'done'}
                                                GetResults={getAverageCuttingTime}
                                    />
                            </div>
                            <div className="col-12">
                                <TimeSummaryWidget DateRange = {dateRangeState} shopId="1"
                                    WidgetTitle='Average Accepted'
                                    Description='The average amount of accepted applications 
                                                compared to the total applications made'
                                                status={'done'}
                                                GetResults={getAverageWaitingTime}
                                    />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { MainSection };
