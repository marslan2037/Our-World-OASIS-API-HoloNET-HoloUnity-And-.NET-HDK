import React from 'react';
import data from '../SideNavData'
import SideMenu from '../SideMenu';
import '../../css/SideNav.css';

export class SideNav extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showSubNav: false
        }
    }

    render() {
        return (
            <div className={`side-nav ${this.props.showSidebar ? "side-nav-show" : ""}`}>
                <ul className="side-nav-list">
                    {data.map((menu, index) => <SideMenu menu={menu} key={index} hideSideNav={this.props.toggleSidebar} />)}
                </ul>
            </div>
        )
    }
}

export default SideNav;
