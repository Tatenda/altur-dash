import React, { useEffect, useState, useContext } from 'react';
import { Icon, Menu, Dropdown, Select } from 'antd';
import { Route } from 'react-router-dom';
import { Header, Dashboard, Candidates, Jobs, Applications, Company } from '../..';
import { ClickParam } from 'antd/lib/menu';
import { history } from '../../../_helpers';
import SubMenu from 'antd/lib/menu/SubMenu';
import { authenticationService, userService } from '../../../_services';
import { JobsCandidate } from '../jobs/jobsCandidate.component';
import { IOrganisation } from '../../../_models/organisation.model';
import { OrganisationContext } from '../../../_hooks/Organisation.context';

const MainContainer: React.FC = () => {
    const { Option } = Select;
    const user = authenticationService.currentUserValue;
    const [org, setOrg] = useState([] as unknown as IOrganisation[]);
    const organisationContext = useContext(OrganisationContext);

    useEffect(() => {
        userService
            .getUserOrganisations(user)
            .then((res: any[]) => {
                const orgz = res.map(x => x.organisation) as IOrganisation[];
                setOrg(orgz);
                organisationContext.dispatch(orgz[0]);
            });
    }, [user]);

    function logout() {
        authenticationService.logout();
        history.push('/login');
    }

    const handleMenuClick = (e: any) => {
        if (e.key === '3') {
        }
    };

    function onChange(value: string) {
        organisationContext.dispatch(org.find(x => x.id === value));
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">All</Menu.Item>
            <Menu.Item key="3">Accepted</Menu.Item>
            <Menu.Item key="2">Rejected</Menu.Item>
        </Menu>
    )

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
            case 'company-create':
                history.push('/dashboard/company/create');
                break;
            case 'company-list':
                history.push('/dashboard/company/list');
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
                                            <Select
                                                showSearch
                                                value={organisationContext.organisationState.id}
                                                style={{ width: 200, marginLeft: '15px', marginTop: '15px' }}
                                                placeholder="Select Organisation"
                                                optionFilterProp="children"
                                                onChange={onChange}
                                            >
                                                {
                                                    org.map(o => <Option key={o.id} value={o.id}>{o.title}</Option>)
                                                }
                                            </Select>
                                            <Menu.Item key="dashboard">
                                                <Icon type="dashboard" />
                                                <span>Dashboard</span>
                                            </Menu.Item>
                                            <Menu.Item key="candidates">
                                                <Icon type="user" />
                                                <span>Candidates</span>
                                            </Menu.Item>
                                            <SubMenu key="company"
                                                title={
                                                    <span>
                                                        <Icon type="profile" />
                                                        <span>Company</span>
                                                    </span>
                                                }
                                            >
                                                <Menu.Item key="company-create">
                                                    <Icon type="pie-chart" />
                                                    <span>Create</span>
                                                </Menu.Item>
                                                <Menu.Item key="company-list">
                                                    <Icon type="pie-chart" />
                                                    <span>List</span>
                                                </Menu.Item>
                                            </SubMenu>
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
                                            <Menu.Item key="here">
                                                <Icon type="inbox" />
                                                <span>{organisationContext.organisationState.title}</span>
                                            </Menu.Item>
                                        </Menu>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10">
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
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <Route exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/dashboard/candidates" component={Candidates} />
                                <Route exact path="/dashboard/candidates/:id" component={JobsCandidate} />
                                <Route exact path="/dashboard/applications" component={Applications} />
                                <Route path="/dashboard/jobs" component={Jobs} />
                                <Route path="/dashboard/company" component={Company} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export { MainContainer };
