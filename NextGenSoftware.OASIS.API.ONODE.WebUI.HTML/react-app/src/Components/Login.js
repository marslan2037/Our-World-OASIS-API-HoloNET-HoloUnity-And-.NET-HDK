import React from 'react';

import ShowIcon from '../assets/images/visible-icon.svg';
import HideIcon from '../assets/images/hidden-icon.svg';

import Alert from './Alert';
import '../css/Login.css';

import { Modal } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { Formik } from "formik";
import * as Yup from "yup";
const axios = require('axios');

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showPassword: false,
            loading: false,
            alert: null
        }
    }

    initialValues = {
        email: '',
        password: ''
    }
    validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required("Email is required"),
        password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 characters minimum.")
    })

    handleLogin = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        this.setState({ loading: true })

        axios.post('https://api.oasisplatform.world/api/avatar/authenticate', data, { headers })
            .then(response => {
                if (response.data.isError) {
                    this.setState({ alert: { type: 'error', text: response.data.message }, loading: false })
                    return
                }
                //Save to response localstorage
                localStorage.setItem('user', JSON.stringify(response.data.avatar))
                localStorage.setItem('credentials', JSON.stringify(data))
                this.setState({loading: false})
                this.setState({ alert: {type: 'success', text: response.data.message} })
                this.props.setState(response.data.avatar)
                //close form if successful
                this.props.closeForm()
                setTimeout(() => this.setState({ alert: null }), 5000)
            }).catch(error => {
                console.error('There was an error!', error);
                this.setState({ loading: false })
                //Remove pop up after 5 sec
                setTimeout(() => this.setState({ alert: null }), 5000)
            })
    }

    render() {
        const { alert, showPassword } = this.state;
        console.log(this.props);

        return (
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        this.setState({
                            email: values.email,
                            password: values.password
                        })
                        this.handleLogin();

                        setSubmitting(true);
                        // resetForm();
                        setSubmitting(false);
                    }, 400)
                }}
            >
                {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                    
                    <Modal centered className="custom-modal" show={this.props.show} onHide={this.props.hide}>
                        <Modal.Body>
                            <span className="form-cross-icon" onClick={this.props.hide}>
                                <i className="fa fa-times"></i>
                            </span>
                            
                            <form className="custom-form" onSubmit={handleSubmit}>
                                {alert ? <Alert message={alert.text} type={alert.type} /> : null}
                                <div className="form-header">
                                    <h2>Log In</h2>

                                    <p>
                                        Don't have an account? 
                                        <span className="text-link" onClick={this.props.change}> Sign Up!</span>
                                    </p>
                                </div>

                                <div className="form-inputs">
                                    <div className={this.handleFormFieldClass(errors.email, touched.email)}>
                                        <label>EMAIL</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="name@example.com"
                                        />
                                        <span className="text-danger">{errors.email && touched.email && errors.email}</span>
                                    </div>

                                    <div className={this.handleFormFieldClass(errors.password, touched.password)}>
                                        <label>PASSWORD</label>
                                        <div className="have-icon">
                                            <input
                                                type={`${showPassword ? "text" : "password"}`}
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="password"
                                            />
                                            <img
                                                className="field-icon"
                                                onClick={() => this.setState({ showPassword: !showPassword })}
                                                src={showPassword ? ShowIcon : HideIcon}
                                                alt="icon"
                                            />
                                        </div>
                                        <span className="text-danger">{errors.password && touched.password && errors.password}</span>
                                    </div>

                                    <div className="forgot-password">
                                        <label className="text-link">Forgot Password?</label>
                                    </div>

                                    <div className="remember-me">
                                        <label>
                                            <input type="checkbox" name="remember-login" id="remember-login" />
                                            Remember me
                                        </label>
                                    </div>

                                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                                        {this.state.loading ? 'Logging in ' : 'Submit '} {this.state.loading ? <Loader type="Oval" height={15} width={15} color="#fff" /> : null}
                                    </button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                )}
            </Formik>
        )
    }

    handleFormFieldClass(error, touched) {
        let classes = "single-form-field ";
        classes += (error && touched) ? "has-error" : "";

        return classes;
    }
}
