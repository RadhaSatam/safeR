import React, { Component } from 'react';
import "../../css/layout/Header.css";

class Header extends Component {

    render() {
        return (
            <div className="header">
                {/* <img src="logo.png" /> */}
                <span>save</span><span className="green">R</span>
            </div>
        )
    }
}

export default Header;