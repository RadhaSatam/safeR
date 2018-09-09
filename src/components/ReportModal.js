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
            modalIsOpen: false,

            name : '',
            location: '',
            severity: 'mild',
            type: 'Veh-Veh',

            formError: null
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmitReportModal = this.onSubmitReportModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    onSubmitReportModal() {
        console.log('report', this.state);

        if(!this.state.name || !this.state.location || !this.state.severity || !this.state.type) {
            this.setState({ formError: 'Please enter all the values' });
            return null;
        }

        
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
                    <p className="sub-text">Help make your city safer</p>
                    <form className="reportModal-form">
                        <fieldset>
                            <label className="label" htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter your name" onChange={(e) => this.setState({ name: e && e.target && e.target.value ? e.target.value : '' })} value={this.state.name} />
                        </fieldset>
                        <fieldset>
                            <label className="label" htmlFor="location">Collision Location</label>
                            <input type="text" name="location" id="location" placeholder="Location" onChange={(e) => this.setState({ location: e && e.target && e.target.value ? e.target.value : '' })} value={this.state.location} />
                        </fieldset>
                        <fieldset>
                            <label className="label" htmlFor="severity">Severity Level</label>
                            <select id="severity" name="severity" onChange={(e) => this.setState({ severity: e && e.target && e.target.value ? e.target.value : 'mild' })} value={this.state.severity}>
                                <option value="mild">Mild</option>
                                <option value="moderate">Moderate</option>
                                <option value="severe">Severe</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label className="label" htmlFor="type">Type Of Collision</label>
                            <select id="type" name="type" onChange={(e) => this.setState({ type: e && e.target && e.target.value ? e.target.value : 'Veh-Veh' })} value={this.state.type}>
                                <option value="Veh-Veh">Vehicle to Vehicle</option>
                                <option value="Veh-Ped">Vehicle to Pedestrian</option>
                                <option value="Ped-Unk">Pedestrian to Unknown</option>
                                <option value="Veh-Mot">Vehicle to Motorist</option>
                                <option value="Single Cyl">Single Cycle</option>
                                <option value="Cyl-Cyl">Cycle to Cycle</option>
                                <option value="Cyl-Unk">Cycle to Unknown</option>
                            </select>
                        </fieldset>
                        <p className="error">{this.state.formError}</p>
                    </form>
                    <div className="btn-divs">
                        <button className="btn btn-modalBtns" onClick={this.closeModal}>Close</button>
                        <button className="btn btn-modalBtns" onClick={this.onSubmitReportModal}>Submit</button>
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