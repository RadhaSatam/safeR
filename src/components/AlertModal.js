import React, { Component } from 'react';
import Modal from 'react-modal';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '300px'
  }
};

class AlertModal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="alertModal">
                <Modal
                    isOpen={this.props.openAlertModal}
                    onRequestClose={this.props.closeAlertModal}
                    style={customStyles}
                    contentLabel="Report a Collision"
                    ariaHideApp={false}
                >          
                    <h2 style={{color: 'red', paddingLeft: '15px'}} className="alertModal-title" ref={subtitle => this.subtitle = subtitle}>Watch Out!</h2>
                    <p className="sub-text">A collision was reported in your area</p>
                    <div className="btn-divs">
                        <button className="btn btn-modalBtns" onClick={this.props.closeAlertModal}>Close</button>
                    </div>
                </Modal>
                }
            </div>
        )
    }
}
export default AlertModal;