import React, { Component } from 'react';
import ReportModal from './ReportModal';

import hospital from '../imgs/hospital.png';
import community from '../imgs/community.png';
import park from '../imgs/park.png';
import seniorCenters from '../imgs/seniorCenters.png';
import seniorHomes from '../imgs/seniorHomes.png';
import logo from "../imgs/logo/logo.png";

class ToggleFeatures extends Component {
    render() {
        return (
            <div className="toggle-features">
                <div id="logo-container">
                    <img id="logo" src={logo} alt="safeR" />
                </div>


                <fieldset>
                    <input onClick={this.props.toggleHeatMap} defaultChecked={true} type="checkbox" />
                    <label>Risk Heat Map</label>
                </fieldset>

                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("communityCenters", e.target.checked)} defaultChecked={true} />
                    <img src={community} alt="communityCenters"/>
                    <label>Community Centers</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("parkPoints", e.target.checked)} defaultChecked={true} />
                    <img src={park} alt="parkPoints" />
                    <label>Parks</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("hospitals", e.target.checked)} defaultChecked={true} />
                    <img src={hospital} alt="hospitals" />
                    <label>Hospitals</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("seniorHomes", e.target.checked)} defaultChecked={true} />
                    <img src={seniorHomes} alt="seniorHomes" />
                    <label>Senior Homes</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" onClick={(e) => this.props.toggleMarkers("seniorCenters", e.target.checked)} defaultChecked={true} />
                    <img src={seniorCenters} alt="seniorCenters" />
                    <label>Senior Centers</label>
                </fieldset>

                <ReportModal />
            </div>
        )
    }
}

export default ToggleFeatures;