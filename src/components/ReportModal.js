import React, { Component } from 'react';
import Modal from 'react-modal';
import "../css/ReportModal.css";

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

class ReportModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    render() {
        return (
            <div className="reportModal">
                {this.state.modalIsOpen && 
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Report a Collision"
                    ariaHideApp={false}
                >          
                    <h2 className="reportModal-title" ref={subtitle => this.subtitle = subtitle}>Report a Collision</h2>
                    <p>Help make your city safer</p>
                    <form className="reportModal-form">
                        <fieldset>
                            <label className="label" htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter your name" />
                        </fieldset>
                        <fieldset>
                            <label className="label" htmlFor="location">Collision Location</label>
                            <input type="text" name="location" id="location" placeholder="Location" />
                        </fieldset>
                        <fieldset>
                            <label className="label" htmlFor="location">Severity Level</label>
                            <select>
                                <option value="mild">Mild</option>
                                <option value="moderate">Moderate</option>
                                <option value="severe">Severe</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label className="label" htmlFor="location">Type Of Collision</label>
                            <select>
                                <option value="Veh-Veh">Vehicle to Vehicle</option>
                                <option value="Veh-Ped">Vehicle to Pedestrian</option>
                                <option value="Ped-Unk">Pedestrian to Unknown</option>
                                <option value="Veh-Mot">Vehicle to Motorist</option>
                                <option value="Single Cyl">Single Cycle</option>
                                <option value="Cyl-Cyl">Cycle to Cycle</option>
                                <option value="Cyl-Unk">Cycle to Unknown</option>
                            </select>
                        </fieldset>
                    </form>
                    <div className="btn-divs">
                        <button className="btn btn-modalBtns" onClick={this.closeModal}>Close</button>
                        <button className="btn btn-modalBtns" onClick={this.closeModal}>Submit</button>
                    </div>
                </Modal>
                }
                <div className="btn-container">
                    <button onClick={this.openModal} className="btn btn-reportButton">Report</button>
                </div>
            </div>
        )
    }
}

export default ReportModal;