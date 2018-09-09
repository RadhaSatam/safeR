import React, { Component } from 'react';
import "../../css/layout/Header.css";
import logo from "../../imgs/logo/logo.png";
class Header extends Component {

    render() {
        return (
            <div className="header">
                <img id="logo" src={logo} alt="safeR"/>
            </div>
        )
    }
}

export default Header;