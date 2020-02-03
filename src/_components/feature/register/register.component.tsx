import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '../../../_services';
import { RegisterModel } from '../../../_models/register.model';

interface IProps {
    history: any,
    location: any
}

const RegisterPage: React.FC<IProps> = ({ history, location }) => {
    if (authenticationService.currentUserValue) {
        history.push('/');
    }

    return (
        <div>
            <h2>Register</h2>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={Yup.object().shape({
                    first_name: Yup.string().required('First Name Required'),
                    last_name: Yup.string().required('Last Name Required'),
                    email: Yup.string().email('Enter a valid email address.').required('Email Required'),
                    password: Yup.string().required('Password is required'),
                    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null]).required('Confirm Password is required')
                })}
                onSubmit={({ first_name, last_name, email, password }, { setStatus, setSubmitting }) => {
                    setStatus();
                    const model = new RegisterModel(email, email, password, first_name, last_name);
                    authenticationService.register(model)
                        .then(
                            user => {
                                const { from } = location.state || { from: { pathname: "/" } };
                                history.push(from);
                            },
                            error => {
                                setSubmitting(false);
                            }
                        );
                }}
            >{({ errors, status, touched, isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                        {isSubmitting &&
                            <img alt="Loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {status && <div className={'alert alert-danger'}>{status}</div>}
                </Form>
            )}
            </Formik>
        </div>
    );
}

export { RegisterPage };
