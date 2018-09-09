import L from 'leaflet';

import hospital from '../imgs/hospital.png';
import community from '../imgs/community.png';
import park from '../imgs/park.png';
import seniorCenters from '../imgs/seniorCenters.png';
import seniorHomes from '../imgs/seniorHomes.png';
import reportedIncidents from '../imgs/reportedIncidents.png';

var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [24, 24],
    }
});

export const communityCentersIcon = new LeafIcon({iconUrl: community});
export const hospitalsIcon = new LeafIcon({iconUrl: hospital});
export const parkPointsIcon = new LeafIcon({iconUrl: park});
export const seniorCentersIcon =new LeafIcon({iconUrl: seniorCenters});
export const seniorHomesIcon = new LeafIcon({iconUrl: seniorHomes});
export const reportedIncidentsIcon = new LeafIcon({ iconUrl: reportedIncidents })