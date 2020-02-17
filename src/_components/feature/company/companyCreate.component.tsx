import React, { useEffect, useState } from 'react';
import { Form, Select, Button, Input, message } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { CompanyCreateModel, ICompanyModel } from '../../../_models/company.model';
import TextArea from 'antd/lib/input/TextArea';
import { categoryService } from '../../../_services/categories.service';
import { ICategory } from '../../../_models/category.model';
import { IChartBot } from '../../../_models/chatbots.model';
import { chatbotService } from '../../../_services/chatbot.service';
import { authenticationService } from '../../../_services';
import { companyService } from '../../../_services/company.service';

type FormProps = FormComponentProps;

const CompanyCreateForm = (props: FormProps): JSX.Element => {
    const { getFieldDecorator } = props.form;
    const children: string[] = [];
    const [categoties, setCategoties] = useState([] as unknown as ICategory[]);
    const [chatbots, setChatbots] = useState([] as unknown as IChartBot[]);

    useEffect(() => {
        categoryService.getCategories()
            .then((res: ICategory[]) => setCategoties(res))
            .catch(err => console.error);
        chatbotService.getChatbots()
            .then((res: IChartBot[]) => setChatbots(res))
            .catch(err => console.error);
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const key = 'updatable';
        props.form.validateFields((err, values) => {
            console.log(authenticationService.currentUserValue);
            const modelVals = {
                ...values,
                user: authenticationService.currentUserValue.id
            }
            if (!err) {
                const model = new CompanyCreateModel(modelVals);
                message.loading({ content: 'Saving Company...', key });
                companyService.addCompany(model)
                    .then(res => {
                        message.success({ content: 'Company Successfully Saved!', key, duration: 2 });
                        props.form.resetFields();
                    }, err => {
                        message.error({ content: err.message, key, duration: 2 });
                    });
            }
        });
    };

    function handleChange(value: string) {
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

    const { Option } = Select;

    return (
        <div className="col-12">
            <div className="containerBody col-12">
                <div className="col-12 graphContainerHeader">
                    <p>Create Company</p>
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
                            label="Address"
                            labelAlign="left"
                        >
                            {getFieldDecorator('address', {
                                rules: [],
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
                            })(<Input placeholder="Website" />)}
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            labelAlign="left"
                        >
                            {getFieldDecorator('category', {
                                rules: [{ required: true, message: 'Please select company category!', whitespace: true }],
                            })(
                                <Select
                                    placeholder="Select a Category"
                                // onChange={onChange}
                                >
                                    {
                                        categoties.map((category: ICategory) => <Option key={category.id} value={category.id}>{category.title}</Option>)
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Chat Bot"
                            labelAlign="left"
                        >
                            {getFieldDecorator('chatbot', {
                                rules: [{ required: true, message: 'Please select chatbot!', whitespace: true }],
                            })(
                                <Select
                                    placeholder="Select a Chatbot"
                                >
                                    {
                                        chatbots.map((bot: IChartBot) => <Option key={bot.id} value={bot.id}>{bot.title}</Option>)
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="City"
                            labelAlign="left"
                        >
                            {getFieldDecorator('city', {
                                rules: [{ required: true, message: 'Please enter city!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item
                            label="Province"
                            labelAlign="left"
                        >
                            {getFieldDecorator('province', {
                                rules: [],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            labelAlign="left">
                            {getFieldDecorator('description', {
                                rules: [],
                            })(<TextArea
                                placeholder="Company Description"
                                autoSize={{ minRows: 2, maxRows: 6 }}
                            />)}
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

export const CompanyCreate = Form.create()(CompanyCreateForm);