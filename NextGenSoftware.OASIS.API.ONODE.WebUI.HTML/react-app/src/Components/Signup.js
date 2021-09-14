
import React from "react";
import Loader from "react-loader-spinner";

import ShowIcon from '../assets/images/visible-icon.svg';
import HideIcon from '../assets/images/hidden-icon.svg';

import Alert from './Alert';
import "../css/Login.css";

import { Modal } from 'react-bootstrap';
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

export default class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false,
            loading: false,
            alert: null
        }
    }

    initialValues = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
        password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 characters minimum."),
        confirmPassword: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 characters minimum.")
            .oneOf([Yup.ref('password'), null], "Password did not match")
    })

    handleSignup = () => {
        // e.preventDefault();

        if (this.state.password === this.state.confirmPassword) {
            let data = {
                email: this.state.email,
                password: this.state.password
            }

            const headers = {
                'Content-Type': 'application/json'
            };

            this.setState({ loading: true })
            axios.post('https://api.oasisplatform.world/api/avatar/register', data, { headers })
                .then(response => {
                    console.log(response)
                    this.setState({ loading: false })
                    this.setState({ alert: { type: 'success', text: response.data } });
                    // Remove alert after 5 sec
                    setTimeout(() => this.setState({ alert: null }), 5000)
                    console.log(this.state.alert)
                }).catch(error => {
                    console.error(error.response.data);
                    this.setState({ loading: false })
                    this.setState({ alert: { type: 'error', text: error.response.data.title } })
                    setTimeout(() => this.setState({ alert: null }), 5000)
                });
        } else {
            console.log('Password did not match');
            alert('Password did not match');
        }
    }

    render() {
        const { alert, showPassword, showConfirmPassword } = this.state;

        return (

            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        this.setState({
                            email: values.email,
                            password: values.password,
                            confirmPassword: values.confirmPassword
                        })
                        this.handleSignup();

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
                                    <h2>Sign Up</h2>

                                    <p>
                                        Already have an account? 
                                        <span className="text-link" onClick={this.props.change}> Log In!</span>
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
                                    
                                    <div className={this.handleFormFieldClass(errors.confirmPassword, touched.confirmPassword)}>
                                        <label>CONFIRM PASSWORD</label>
                                        <div className="have-icon">
                                            <input
                                                type={`${showConfirmPassword ? "text" : "password"}`}
                                                name="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="confirm password"
                                            />
                                            <img
                                                className="field-icon"
                                                onClick={() => this.setState({ showConfirmPassword: !showConfirmPassword })}
                                                src={showConfirmPassword ? ShowIcon : HideIcon}
                                                alt="loading..."
                                            />
                                        </div>
                                        <span className="text-danger">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</span>
                                    </div>

                                    

                                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                                        {this.state.loading ? 'Creating Account ' : 'Submit '} {this.state.loading ? <Loader type="Oval" height={15} width={15} color="#fff" /> : null}
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
