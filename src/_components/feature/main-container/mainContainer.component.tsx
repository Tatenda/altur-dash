import React, { useEffect } from 'react';
import { Icon, Menu } from 'antd';
import { Route } from 'react-router-dom';
import { Header, Dashboard, Candidates, Jobs, Applications } from '../..';
import { ClickParam } from 'antd/lib/menu';
import { history } from '../../../_helpers';
import SubMenu from 'antd/lib/menu/SubMenu';
import { authenticationService } from '../../../_services';
import { JobsCandidate } from '../jobs/jobsCandidate.component';

const MainContainer: React.FC = () => {

    useEffect(() => { })

    function logout() {
        authenticationService.logout();
        history.push('/login');
    }

    const menuClick = (item: ClickParam) => {
        switch (item.key) {
            case 'dashboard':
                history.push('/dashboard');
                break;
            case 'jobs-create':
                history.push('/dashboard/jobs/create');
                break;
            case 'jobs-list':
                history.push('/dashboard/jobs/list');
                break;
            case 'logout':
                logout()
                break;
            default:
                history.push(`/dashboard/${item.key}`);
                break;
        }

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Header />
                <div className="col-12">
                    <div className="row">
                        <div className="col-2">
                            <div className="row">
                                <div className="sidebar col-12">
                                    <div className="row">
                                        <Menu
                                            defaultSelectedKeys={['1']}
                                            defaultOpenKeys={['sub1']}
                                            mode="inline"
                                            onClick={menuClick}
                                            style={{ backgroundColor: '#fcfcfc', height: '100vh' }}
                                        >
                                            <Menu.Item key="dashboard">
                                                <Icon type="dashboard" />
                                                <span>Dashboard</span>
                                            </Menu.Item>
                                            <Menu.Item key="candidates">
                                                <Icon type="user" />
                                                <span>Candidates</span>
                                            </Menu.Item>
                                            {/* <Menu.Item key="applications">
                                                <Icon type="pie-chart" />
                                                <span>Applications</span>
                                            </Menu.Item> */}
                                            <SubMenu key="jobs"
                                                title={
                                                    <span>
                                                        <Icon type="profile" />
                                                        <span>Jobs</span>
                                                    </span>
                                                }
                                            >
                                                <Menu.Item key="jobs-create">
                                                    <Icon type="pie-chart" />
                                                    <span>Create</span>
                                                </Menu.Item>
                                                <Menu.Item key="jobs-list">
                                                    <Icon type="pie-chart" />
                                                    <span>List</span>
                                                </Menu.Item>
                                            </SubMenu>
                                            <Menu.Item key="logout">
                                                <Icon type="inbox" />
                                                <span>Log Out</span>
                                            </Menu.Item>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <Route exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/dashboard/candidates" component={Candidates} />
                                <Route exact path="/dashboard/candidates/:id" component={JobsCandidate} />
                                <Route path="/dashboard/applications" component={Applications} />
                                <Route path="/dashboard/jobs" component={Jobs} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export { MainContainer };
