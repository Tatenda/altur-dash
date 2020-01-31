import React from 'react';
import { Form, Input, Button, Select, DatePicker, Radio } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import TextArea from 'antd/lib/input/TextArea';
import './style.scss';
import { JobCreateModel, IJobCreateModel } from '../../../_models/jobs.model';
import { jobsService } from '../../../_services/jobs.service';

type FormProps = FormComponentProps;

const JobCreateForm = (props: FormProps): JSX.Element => {
    const { getFieldDecorator } = props.form;
    const createModel = {} as IJobCreateModel;
    const { Option } = Select;

    const children: string[] = [];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            const modelVals = {
                ...values,
                closing_date: values['closingDate'].format('YYYY-MM-DD'),
            }
            if (!err) {
                const model = new JobCreateModel(modelVals);
                jobsService.addJob(model)
                    .then(res => {
                        console.log(res);
                    })
                console.log(modelVals);
            }
        });
    };

    function handleChange(value: string) {
    }

    function onChange(date: any, dateString: string) {
        createModel.closing_date = dateString;
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

    const selectAfter = (
        <Select defaultValue=".com" style={{ width: 80 }}>
            <Option value=".com">.com</Option>
            <Option value=".jp">.jp</Option>
            <Option value=".cn">.cn</Option>
            <Option value=".org">.org</Option>
        </Select>
    );

    return (
        <div className="col-12">
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
                            {getFieldDecorator('company', {
                                rules: [{
                                    required: true,
                                    message: 'Please company name!',
                                    whitespace: true
                                }],
                            })(<Input />)}
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
                            })(<Input addonAfter={selectAfter} placeholder="Website" />)}
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            labelAlign="left"
                        >
                            {getFieldDecorator('category', {
                                rules: [{ required: true, message: 'Please enter Job Category!', whitespace: true }],
                            })(<Input />)}
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
                            })(<DatePicker onChange={onChange} />)}
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
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export const JobCreate = Form.create()(JobCreateForm);