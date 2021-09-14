import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SideNav from "./common/SideNav";
import Navbar from "./common/Navbar";
import PayWithSeeds from "./pages/seeds/PayWithSeeds";
import SendInvite from "./pages/seeds/SendInvite";
import Karma from "./pages/karma/Karma";
import Home from "../pages/Home";
import Login from "./Login";
import Signup from "./Signup";

import "../css/App.css";
import "../css/Seeds.css";
import "../assets/scss/style.scss";

class App extends React.Component {
    state = {
        showSidebar: false,
        showLogin: false,
        showSignup: false
    }

    toggleSidebar = () => {
        this.setState({
            showSidebar: !this.state.showSidebar
        })
    }

    hidePopups = () => {
        this.setState({
            showLogin: false,
            showSignup: false
        })
    }

    hideLogin = () => {
        this.setState({
            showLogin: false,
        })
    }

    hideSignup = () => {
        this.setState({
            showSignup: false,
        })
    }

    showLogin = () => {
        this.setState({
            showLogin: true,
            showSignup: false,
        })
    }

    showSignup = () => {
        this.setState({
            showSignup: true,
            showLogin: false
        })
    }

    render() { 
        return (
            <div className="main-container">
                <Router>
                    <header>
                        <Navbar 
                            showSidebar={this.state.showSidebar} 
                            toggleSidebar={this.toggleSidebar}
                            showLogin={this.showLogin} 
                            showSignup={this.showSignup} 
                        />
                        <SideNav showSidebar={this.state.showSidebar} toggleSidebar={this.toggleSidebar}  />
                    </header>

                    <Switch>
                        {/* <Route exact path="/" component={Home} /> */}
                        <Route path="/pay-with-seeds" component={PayWithSeeds} />
                        <Route path="/send-invite" component={SendInvite} />
                        <Route exact path="/karma" component={Karma} />
                    </Switch>
                </Router>

                <Login 
                    className="custom-form"
                    show={this.state.showLogin} 
                    hide={this.hideLogin}
                    change={this.showSignup} 
                    setState={this.setLoginState} 
                    closeForm={this.closeLogins} 
                /> 

                <Signup
                    className="custom-form" 
                    show={this.state.showSignup} 
                    hide={this.hideSignup}
                    change={this.showLogin} 
                    setState={this.setLoginState} 
                    closeForm={this.closeLogins} 
                /> 
            </div>
        );
    }
}
 
export default App;