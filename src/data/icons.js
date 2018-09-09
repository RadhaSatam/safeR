import L from 'leaflet';

import hospital from '../imgs/hospital.png';
import communityCenters from '../imgs/communityCenters.png';
import park from '../imgs/park.png';
import seniorCenters from '../imgs/seniorCenters.png';
import seniorHomes from '../imgs/seniorHomes.png';

var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [20, 20],
    }
});

export const communityCentersIcon = new LeafIcon({iconUrl: communityCenters});
export const hospitalsIcon = new LeafIcon({iconUrl: hospital});
export const parkPointsIcon = new LeafIcon({iconUrl: park});
export const seniorCentersIcon =new LeafIcon({iconUrl: seniorCenters});
export const seniorHomesIcon = new LeafIcon({iconUrl: seniorHomes});