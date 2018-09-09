import React from 'react';
import L from 'leaflet';
import "leaflet.heat";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "../css/MapComponent.css"
import proj4 from "proj4";

import communityCenters from '../data/amenities/communityCenters';
import hospitals from '../data/amenities/hospitals';
import parkPoints from '../data/amenities/parkPoints';
import seniorCenters from '../data/amenities/seniorCenters';
import seniorHomes from '../data/amenities/seniorHomes';

import { firebaseDb } from "../utils/firebaseConfig";

import { heatMapPoints } from '../data/heatMapPoints';

import ToggleFeatures from './ToggleFeatures';

import {
  communityCentersIcon,
  hospitalsIcon,
  parkPointsIcon,
  seniorCentersIcon,
  seniorHomesIcon
} from '../data/icons';

var heat = null;
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heatMapActive: true,
      markers: { 
                  communityCenters: {},
                  hospitals: {},
                  parkPoints: {},
                  seniorCenters: {},
                  seniorHomes: {},
              },
      reportedCollisions: {}
    }
    this.toggleHeatMap = this.toggleHeatMap.bind(this);
    this.toggleMarkers = this.toggleMarkers.bind(this);
    this.toggleReportedIncidents = this.toggleReportedIncidents.bind(this);
  }
  
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [49.2870715, -123.1364628],
      zoom: 15,
      zoomControl: false,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    //add zoom control with your options
    L.control.zoom({
      position:'topright'
    }).addTo(this.map);

    // add heat layer    
    heat = L.heatLayer(heatMapPoints, {maxZoom: 15, radius: 20, blur: 12, max: 1.0, gradient: {
      0:  '#f23e45',
      0.50: 'lime',
      0.70: 'yellow',
      0.95: '#FF8300',
      1.0:  '#ff3030'}}).addTo(this.map);

    // add search control
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      position: "topright"
    });

    this.map.addControl(searchControl);

    // add markers
    this.toggleMarkers();

    // add all the pointers 
    // add community center markers 
    this.toggleMarkers('communityCenters', true).then(() => 
      this.toggleMarkers('hospitals', true)
    ).then(() => 
    this.toggleMarkers('parkPoints', true)
    ).then(() =>
    this.toggleMarkers('seniorCenters', true)
    ).then(() => 
    this.toggleMarkers('seniorHomes', true)
    )

    this.toggleReportedIncidents(true);
  }

  componentDidUnmount() {
    firebaseDb.ref(`/collisionReport`).off();
  }

  toggleReportedIncidents(trigger) {
    if(trigger) {
      firebaseDb.ref(`/collisionReport`).on('value', snap => {
        let snapVals = snap && snap.val() ? snap.val() : null;
        for(let i in snapVals) {
          if(snapVals[i].latitude && snapVals[i].longitude) {
            let marker = L.marker([snapVals[i].latitude, snapVals[i].longitude]).addTo(this.map);
            marker.bindPopup(`<div><b>Reported By:</b> ${snapVals[i].name}<br/><b>Incident Type:</b> ${snapVals[i].type}<br/><b>Severity:</b> ${snapVals[i].severity}</div>`).openPopup();
            this.setState({
              reportedCollisions: {...this.state.reportedCollisions, [i]: marker }
            });
          }
        }
      })
    }
    else {
      if(this.state.reportedCollisions && Object.keys(this.state.reportedCollisions).length > 0) {
        for(let i in this.state.reportedCollisions) {
          this.map.removeLayer(this.state.reportedCollisions[i]); // remove
        }
        this.setState({ reportedCollisions: {} })
      }
    }
  }

  // toggles the heat map
  toggleHeatMap() {
    if(this.state.heatMapActive) {
      this.map.removeLayer(heat);
    }
    else {
      this.map.addLayer(heat);
    }
    this.setState({ heatMapActive: !this.state.heatMapActive })
  }

  // function to toggle all the heat maps (remove layer should be applied on this.map)
  toggleMarkers(type, trigger) {
    let dataToUse = null,
        iconToUse = null,
        xLoc = 0,
        yLoc = 1,
        convertUTMtoLatLong = false,
        titleLoc = 1;
    switch(type) {
      case 'communityCenters': {
        dataToUse = communityCenters;
        iconToUse= communityCentersIcon;
        xLoc = 4;
        yLoc = 6;
        convertUTMtoLatLong = true;
        break;
      }
      case 'hospitals': {
        dataToUse = hospitals;
        iconToUse= hospitalsIcon;
        xLoc = 2;
        yLoc = 4;
        convertUTMtoLatLong = true;
        break;
      }
      case 'parkPoints': {
        dataToUse = parkPoints;
        iconToUse= parkPointsIcon;
        xLoc = 1;
        yLoc = 3;
        titleLoc = 0;
        break;
      }
      case 'seniorCenters': {
        dataToUse = seniorCenters;
        iconToUse= seniorCentersIcon;
        xLoc = 2;
        yLoc = 4;
        convertUTMtoLatLong = true;
        break;
      }
      case 'seniorHomes': {
        dataToUse = seniorHomes;
        iconToUse= seniorHomesIcon;
        xLoc = 6;
        yLoc = 8;
        convertUTMtoLatLong = true;
        break;
      }
    };


    if(trigger && trigger === true) {
      let stateToUpdate = this.state.markers;
      dataToUse.map((val, index) => {
        let coordinates = val.slice(xLoc, yLoc).map(i => parseFloat(i));
        if(convertUTMtoLatLong) {
          var utm = "+proj=utm +zone=10";
          var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
          coordinates = proj4(utm,wgs84,coordinates); // convert utm 10 to lat long
          coordinates = coordinates.reverse();
        }
        let marker = L.marker(coordinates, { icon: iconToUse }).addTo(this.map);
        marker.bindPopup(val[titleLoc]).openPopup();
        stateToUpdate = {...stateToUpdate, [type]: { ...stateToUpdate[type], [index]: marker }}
      })
      return Promise.resolve(this.setState({ markers: stateToUpdate }));
    } else {
      if (this.state.markers && this.state.markers[type]) { // check
        dataToUse.map((val, index) => {
          this.map.removeLayer(this.state.markers[type][index]); // remove
        });
        return Promise.resolve(this.setState({ markers: {...this.state.markers, [type]: {} } }));
      }
    }
  }

  render() {
    return (
      <div id="map-container" style={{height: "100vh"}}>
        <div id="map" style={{height: "100%"}}></div>  
        <ToggleFeatures 
          toggleHeatMap={this.toggleHeatMap}
          toggleMarkers={this.toggleMarkers}
          toggleReportedIncidents={this.toggleReportedIncidents}
        />
      </div>
    )
  }
}

export default Map;