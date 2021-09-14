import React from "react";

import Login from "../Login";
import Signup from "../Signup";

import logo from "../../assets/images/dummy-logo.svg";
import loginIcon from "../../assets/images/loggedin.png";

import "../../css/Navbar.css";

import axios from "axios";

class Navbar extends React.Component {

    constructor(props) {
        super(props)

        this.showSignup = this.showSignup.bind(this)
        this.showLogin = this.showLogin.bind(this)
        this.closeLogins = this.closeLogins.bind(this)
        
        this.state = {
            showLogin: false,
            showSignup: false,
            user: null
        }
    }

    componentDidMount() {
        localStorage.getItem('user')

        if (localStorage.getItem('user')) {
            this.setState({ user: JSON.parse(localStorage.getItem('user')) })
        }
    }

    closeLogins() {
        this.setState({
            showLogin: false,
            showSignup: false
        })
    }

    showLogin() {
        this.setState({
            showLogin: true,
            showSignup: false
        })
    }

    showSignup() {
        this.setState({
            showLogin: false,
            showSignup: true,
        })
    }

    setLoginState = (user) => {
        this.setState({ user })

    }

    handleLogout = () => {
        axios.post('https://api.oasisplatform.world/api/avatar/revoke-token', {
            token: this.state.user.jwtToken
        }).then(res => {
            this.setState({ user: null })
            localStorage.removeItem('user')
            localStorage.removeItem('credentials')
        }).catch(err => {
            this.setState({ user: null })
            localStorage.removeItem('user')
            localStorage.removeItem('credentials')
        })
    }

    render() {
        return (
            <nav className="nav">
                <div className="nav-left">
                    <div 
                        className={`nav-menu-btn ${this.props.showSidebar ? "nav-menu-open" : ""}`} 
                        onClick={this.props.toggleSidebar}
                    >
                        <div className="nav-menu-btn-burger"></div>
                    </div>

                    <img className="nav-logo" src={logo} alt="logo" />
                </div>

                <div className="nav-right">
                    {
                        this.state.user ? null :
                        <ul>
                            <li onClick={this.props.showLogin}><a href="#">Log in</a> </li>
                            <li onClick={this.props.showSignup}><a href="#">Sign up</a></li>
                        </ul>
                    }

                    <ul>
                        <li className="have-avatar">
                            <a href="#">
                                {
                                    this.state.user ? <img src={loginIcon} alt="icon" /> :
                                    <svg viewBox="0 0 26.5 26.5">
                                        <path
                                            d="M24.75 13.25a11.5 11.5 0 01-11.5 11.5 11.5 11.5 0 01-11.5-11.5 11.5 11.5 0 0111.5-11.5 11.5 11.5 0 0111.5 11.5zm-3.501 8.243c-.5-3.246-4-6.246-7.995-6.238C9.25 15.247 5.75 18.247 5.25 21.5m13-11.248a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5z"
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="1.5" 
                                        />
                                    </svg>
                                }    
                            </a>

                            {
                                this.state.user ?
                                
                                <ul className="inner-menu">
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Edit Account</a></li>
                                    <li><a href="#" onClick={this.handleLogout}>Logout</a></li>
                                </ul>

                                : null
                            }
                        </li>
                    </ul>
                </div>

                <div className={`login ${this.state.showLogin || this.state.showSignup ? "show" : ""}`}>
                    <button className="login-hide-btn" onClick={this.closeLogins}>&#10006;</button>
                    {this.state.showLogin ? <Login change={this.showSignup} setState={this.setLoginState} closeForm={this.closeLogins} /> : null}
                    {this.state.showSignup ? <Signup change={this.showLogin} closeForm={this.closeLogins} /> : null}
                </div>
            </nav>
        );
    }
}

export default Navbar;