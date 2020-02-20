import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Select, message, Input } from 'antd';
import { authenticationService } from '../../../_services';
import { CompanyCreateModel } from '../../../_models/company.model';
import { companyService } from '../../../_services/company.service';
import { ICategory } from '../../../_models/category.model';
import { IChartBot } from '../../../_models/chatbots.model';
import TextArea from 'antd/lib/input/TextArea';
import { FormComponentProps } from 'antd/lib/form';
import { OrganisationContext } from '../../../_hooks/Organisation.context';
import { categoryService } from '../../../_services/categories.service';

type FormProps = FormComponentProps;

export const QuickCompanyAddModalForm = (props: FormProps): JSX.Element => {
    const [categoties, setCategoties] = useState([] as unknown as ICategory[]);
    const { getFieldDecorator } = props.form;
    const children: string[] = [];
    const { Option } = Select;
    const { organisationState } = useContext(OrganisationContext);

    useEffect(() => {
        categoryService.getCategories()
            .then((res: ICategory[]) => setCategoties(res))
            .catch(err => console.error);
    }, []);

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const key = 'updatable';
        props.form.validateFields((err, values) => {
            const modelVals = {
                ...values,
                user: authenticationService.currentUserValue.id,
                organisation: organisationState.id,
                chatbot: "5e3fbe33e8e69e476d6b784d",
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

    return (
        <div className="containerBody col-12">
            <div className="col-12 graphContainerHeader">
                <p>Quick Company Create</p>
            </div>
            <div className="col-12">
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
                        label="City"
                        labelAlign="left"
                    >
                        {getFieldDecorator('city', {
                            rules: [{ required: true, message: 'Please enter city!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item
                        label="Keywords"
                        labelAlign="left">
                        {getFieldDecorator('keywords', {
                            rules: [{ required: true, message: 'Add atleast one keyword' }],
                        })(
                            <Select mode="tags" style={{ width: '100%' }} placeholder="Keywords">
                                {children}
                            </Select>)}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button icon="file-add"
                            style={{ width: '100%' }}
                            type="primary" htmlType="submit">
                            Add Company
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export const QuickCompanyAddModal = Form.create()(QuickCompanyAddModalForm);