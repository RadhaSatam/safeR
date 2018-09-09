import L from 'leaflet';
var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [64, 64],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

export const communityCentersIcon = new LeafIcon({iconUrl: './hospital.png'});
export const hospitalsIcon = new LeafIcon({iconUrl: '../imgs/communityCenters.png'});
export const parkPointsIcon = new LeafIcon({iconUrl: '../imgs/communityCenters.png'});
export const seniorCentersIcon =new LeafIcon({iconUrl: '../imgs/communityCenters.png'});
export const seniorHomesIcon = new LeafIcon({iconUrl: '../imgs/communityCenters.png'});