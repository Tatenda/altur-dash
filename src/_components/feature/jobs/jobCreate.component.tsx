import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Radio, message, Modal } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import TextArea from 'antd/lib/input/TextArea';
import './style.scss';
import { JobCreateModel, IJobCreateModel } from '../../../_models/jobs.model';
import { jobsService } from '../../../_services/jobs.service';
import { ICategory } from '../../../_models/category.model';
import { categoryService } from '../../../_services/categories.service';
import { companyService } from '../../../_services/company.service';
import { ICompanyModel } from '../../../_models/company.model';
import { userService, authenticationService } from '../../../_services';
import { IOrganisation } from '../../../_models/organisation.model';
import { QuickCompanyAddModal } from '../company/quickCompanyAddModal.component';


type FormProps = FormComponentProps;

const JobCreateForm = (props: FormProps): JSX.Element => {
    const { getFieldDecorator } = props.form;
    const createModel = {} as IJobCreateModel;
    const [categories, setCategories] = useState([] as unknown as ICategory[]);
    const [companies, setCompanies] = useState([] as unknown as ICompanyModel[]);
    const [visible, setVisible] = useState(false)
    const { Option } = Select;
    const [org, setOrg] = useState([] as unknown as IOrganisation[]);
    const user = authenticationService.currentUserValue;
    const [refreshingCompany, setRefreshingCompany] = useState(false);
    const [creatingJob, setCreatingJob] = useState(false);

    const children: string[] = [];

    useEffect(() => {
        categoryService.getCategories()
            .then((res: ICategory[]) => setCategories(res))
            .catch(err => console.error);
        companyService.getCompany()
            .then((res: ICompanyModel[]) => setCompanies(res))
            .catch(err => console.error);
    }, []);

    useEffect(() => {
        userService
            .getUserOrganisations(user)
            .then((res: any[]) => {
                const orgz = res.map(x => x.organisation) as IOrganisation[];
                setOrg(orgz);
            });
    }, [user]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const key = 'updatable';
        props.form.validateFields((err, values) => {
            const modelVals = {
                ...values,
                closing_date: new Date(values['closingDate']).toISOString(),
                chatbot: "5e3fbe33e8e69e476d6b784d",
                user: user.id
            }
            console.log('err: ', err);
            console.log('values: ', values);

            if (!err) {
                const model = new JobCreateModel({ ...modelVals });
                message.loading({ content: 'Saving Job...', key });
                jobsService.addJob(model)
                    .then(res => {
                        message.success({ content: 'Job Successfully Saved!', key, duration: 2 });
                        props.form.resetFields();
                    }, err => {
                        message.error({ content: err.message, key, duration: 2 });
                    });
            }
        });
    };

    function handleChange(value: string) {
    }

    function onChange(date: any, dateString: string) {
        createModel.closing_date = dateString;
    }

    function onCloseModal() {
        setVisible(false);
        setRefreshingCompany(true);
        companyService.getCompany()
            .then((res: ICompanyModel[]) => {
                setCompanies(res);
                setRefreshingCompany(false);
            })
            .catch(err => {
                console.error(err);
                setRefreshingCompany(false);
            });
    }

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 18,
                offset: 6,
            },
        },
    };

    return (
        <div className="col-12">
            <Modal
                visible={visible}
                title="Quick Company Add"
                onCancel={onCloseModal}
                footer={null}
            > <QuickCompanyAddModal /></Modal>
            <div className="containerBody col-12">
                <div className="col-12 graphContainerHeader">
                    <p>Create Job</p>
                </div>
                <div className="col-12 mainBody formCont">
                    <Form {...formItemLayout} onSubmit={handleSubmit}>
                        <Form.Item
                            label="Title"
                            labelAlign="left"
                        >
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please enter Job Title!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item
                            label="Sub-Title"
                            labelAlign="left"
                        >
                            {getFieldDecorator('subtitle', {
                                rules: [],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item
                            label="Company"
                            labelAlign="left"
                        >
                            <div className="row">
                                <div className="col-9">
                                    {getFieldDecorator('company', {
                                        rules: [{ required: true, message: 'Please select company!', whitespace: true }],
                                    })(
                                        <Select
                                            placeholder="Select a Company"
                                            loading={refreshingCompany}
                                            disabled={refreshingCompany}
                                        >
                                            {
                                                companies.map((company: ICompanyModel) => <Option key={company.id} value={company.id}>{company.title}</Option>)
                                            }
                                        </Select>
                                    )}
                                </div>
                                <div className="col">
                                    <Button
                                        onClick={() => setVisible(true)}
                                        icon="file-add"
                                        style={{ width: '100%' }}
                                        type="danger">Add Company
                                        </Button>
                                </div>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Organisation"
                            labelAlign="left"
                        >
                            {getFieldDecorator('organisation', {
                                rules: [{ required: true, message: 'Please select organisation!', whitespace: true }],
                            })(
                                <Select
                                    placeholder="Select an Organisation"
                                // onChange={onChange}
                                >
                                    {
                                        org.map((organisation: IOrganisation) => <Option key={organisation.id} value={organisation.id}>{organisation.title}</Option>)
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="E-mail"
                            labelAlign="left">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item
                            label="Website"
                            labelAlign="left">
                            {getFieldDecorator('website', {
                                rules: [],
                            })(<Input placeholder="Website" />)}
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            labelAlign="left"
                        >
                            {getFieldDecorator('category', {
                                rules: [{ required: true, message: 'Please select job category!', whitespace: true }],
                            })(
                                <Select
                                    placeholder="Select a Category"
                                // onChange={onChange}
                                >
                                    {
                                        categories.map((category: ICategory) => <Option key={category.id} value={category.id}>{category.title}</Option>)
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Location"
                            labelAlign="left"
                        >
                            {getFieldDecorator('location', {
                                rules: [{ required: true, message: 'Please enter Job Location!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item
                            label="Job Description"
                            labelAlign="left">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Job Description is required', whitespace: true }],
                            })(<TextArea
                                placeholder="Job Description"
                                autoSize={{ minRows: 2, maxRows: 6 }}
                            />)}
                        </Form.Item>

                        <Form.Item
                            label="Closing Date"
                            labelAlign="left"
                        >
                            {getFieldDecorator('closingDate', {
                                rules: [
                                    { type: 'object', required: true, message: 'Please select closing date!' }
                                ],
                            })(<DatePicker style={{ width: '100%' }} onChange={onChange} />)}
                        </Form.Item>

                        <Form.Item
                            label="Published?"
                            labelAlign="left">
                            {getFieldDecorator('published', {
                                initialValue: false
                            })(
                                <Radio.Group size="large" buttonStyle="solid">
                                    <Radio.Button value={true}>Yes</Radio.Button>
                                    <Radio.Button value={false}>No</Radio.Button>
                                </Radio.Group>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Keywords"
                            labelAlign="left">
                            {getFieldDecorator('keywords', {
                                rules: [{ required: true, message: 'Add atleast one keyword' }],
                            })(
                                <Select mode="tags" style={{ width: '100%' }} placeholder="Keywords" onChange={handleChange}>
                                    {children}
                                </Select>)}
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button loading={creatingJob} type="primary" htmlType="submit">
                                Create Job
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export const JobCreate = Form.create()(JobCreateForm);