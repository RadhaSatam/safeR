import React, { Component } from 'react';
import ReportModal from './ReportModal';

import hospital from '../imgs/hospital.png';
import community from '../imgs/community.png';
import park from '../imgs/park.png';
import seniorCenters from '../imgs/seniorCenters.png';
import seniorHomes from '../imgs/seniorHomes.png';

class ToggleFeatures extends Component {
    render() {
        return (
            <div className="toggle-features">
                <fieldset>
                    <input onClick={this.props.toggleHeatMap} defaultChecked={true} type="checkbox" />
                    <label>Risk Heat Map</label>
                </fieldset>

                <fieldset>
                    <input type="checkbox" defaultChecked={true} />
                    <img src={community} alt="community"/>
                    <label>Community Centers</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" defaultChecked={true} />
                    <img src={park} alt="park" />
                    <label>Parks</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" defaultChecked={true} />
                    <img src={hospital} alt="hospital" />
                    <label>Hospitals</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" defaultChecked={true} />
                    <img src={seniorHomes} alt="seniorHomes" />
                    <label>Senior Homes</label>
                </fieldset>
                <fieldset>
                    <input type="checkbox" defaultChecked={true} />
                    <img src={seniorCenters} alt="seniorCenters" />
                    <label>Senior Centers</label>
                </fieldset>

                <ReportModal />
            </div>
        )
    }
}

export default ToggleFeatures;