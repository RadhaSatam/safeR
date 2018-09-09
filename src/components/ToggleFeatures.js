import React, { Component } from 'react';
import ReportModal from './ReportModal';

import hospital from '../imgs/hospital.png';
import community from '../imgs/community.png';
import park from '../imgs/park.png';
import seniorCenters from '../imgs/seniorCenters.png';
import seniorHomes from '../imgs/seniorHomes.png';
import logo from "../imgs/logo/logo.png";
import reportedIncidents from '../imgs/reportedIncidents.png';

import slideUp from "../imgs/slide-up.png";
import slideDown from "../imgs/slide-down.png";


class ToggleFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.toggleExpand = this.toggleExpand.bind(this);
    }
    toggleExpand() {
        this.setState({ expanded: !this.state.expanded })
    }
    render() {
        return (
            <div className="toggle-features">
                <div id="logo-container">
                    <img id="logo" src={logo} alt="safeR" />
                </div>
                {this.state.expanded &&
                <React.Fragment>
                <fieldset>
                    <input onClick={this.props.toggleHeatMap} defaultChecked={true} type="checkbox" />
                    <label>Risk Heat Map</label>
                </fieldset>

                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleReportedIncidents(e.target.checked)} defaultChecked={true} />
                    <img width="20px" src={reportedIncidents} alt="reportedIncidents" />
                    <label>Reported Incidents</label>
                </fieldset>

                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("communityCenters", e.target.checked)} defaultChecked={true} />
                    <img src={community} alt="communityCenters"/>
                    <label>Community Centers</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("parkPoints", e.target.checked)} defaultChecked={false} />
                    <img src={park} alt="parkPoints" />
                    <label>Parks</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("hospitals", e.target.checked)} defaultChecked={true} />
                    <img src={hospital} alt="hospitals" />
                    <label>Hospitals</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("seniorHomes", e.target.checked)} defaultChecked={false} />
                    <img src={seniorHomes} alt="seniorHomes" />
                    <label>Senior Homes</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("seniorCenters", e.target.checked)} defaultChecked={true} />
                    <img src={seniorCenters} alt="seniorCenters" />
                    <label>Senior Centers</label>
                </fieldset>

                </React.Fragment>
                }
                <ReportModal />

                <div className="expand-collapse">
                    <button onClick={this.toggleExpand}><img className="toggle-img" src={this.state.expanded ? slideUp : slideDown} alt={this.state.expanded ? 'Collapse' : 'Expand'} /></button>
                </div>
            </div>
        )
    }
}

export default ToggleFeatures;