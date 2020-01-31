import React, { useState, useEffect, useContext } from 'react';
import { authenticationService, queueService } from '../../../_services';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { AddToQueueModel, IAddClientToQueue } from '../../../_models/queue.model';
import { AppContext } from '../../../_hooks/showHeader.context';
import { message } from 'antd';

interface IProps {
}

const Enqueue: React.FC<IProps> = (props) => {
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
    const appState = useContext(AppContext);

    useEffect(() => {
        appState.showHeader = false;
    });

    return (
        <div className="container-fluid enqueue">
            <div className="row">
                <div className="col-8 offset-2 enqueueContainer">
                    <div className="row">
                        <div className="col-5 formImg">
                            <div className="row">
                                <img
                                    // className="img-fluid"
                                    src="/1.1.png" alt="" />
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="header col-12">
                                <div className="row">
                                    <div className="textContainer col-8">
                                        <h2>Join Queue</h2>
                                    </div>
                                    <div className="logoContainer col-4">
                                        <img
                                            className="img-fluid"
                                            src="/legends-black-60x60.png" alt="" />
                                    </div>
                                </div>
                            </div>

                            <Formik
                                initialValues={{
                                    firstname: '',
                                    lastname: '',
                                    phonenumber: '',
                                    email: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    firstname: Yup.string().required('First Name is required'),
                                    lastname: Yup.string().required('Last Name is required'),
                                    phonenumber: Yup.string().required('Password is required'),
                                    email: Yup.string().email().required('Email is required')
                                })}
                                onSubmit={({ firstname, lastname, phonenumber, email }, { setStatus, setSubmitting, resetForm }) => {
                                    setStatus();
                                    message.loading({ content: 'We adding you to the queue...' }, 0);
                                    const model = new AddToQueueModel('1', { firstname, lastname, phonenumber, email } as IAddClientToQueue);
                                    queueService.joinQueue(model)
                                        .then(result => {
                                            message.success({ content: 'Successfully added to queue', duration: 2 });
                                            setSubmitting(false);
                                            resetForm();
                                        });
                                }}
                                render={({ errors, status, touched, isSubmitting }) => (
                                    <Form className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="firstname">Firstname</label>
                                            <Field name="firstname" type="text" className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
                                            <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastname">Lastname</label>
                                            <Field name="lastname" type="text" className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                                            <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phonenumber">Phone Number</label>
                                            <Field name="phonenumber" type="text" className={'form-control' + (errors.phonenumber && touched.phonenumber ? ' is-invalid' : '')} />
                                            <ErrorMessage name="phonenumber" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Join Queue</button>
                                            {isSubmitting &&
                                                <img alt="Loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                        </div>
                                        {status && <div className={'alert alert-danger'}>{status}</div>}
                                    </Form>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export { Enqueue };
