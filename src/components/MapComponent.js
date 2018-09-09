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

import { heatMapPoints } from '../data/heatMapPoints';

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
    }
    this.toggleHeatMap = this.toggleHeatMap.bind(this);
    this.toggleMarkers = this.toggleMarkers.bind(this);
  }
  
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [49.2870715, -123.1364628],
      zoom: 15,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    
    heat = L.heatLayer(heatMapPoints, {maxZoom: 10, radius: 20, max: 1.0, gradient: {0.1: 'yellow', 0.65: 'lime', 1: 'red'}}).addTo(this.map);

    // add search control
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
    });

    this.map.addControl(searchControl);

    // add markers
    this.toggleMarkers();

    // add all the pointers 
    // add community center markers 
    this.toggleMarkers('communityCenters', true);
    this.toggleMarkers('hospitals', true);
    this.toggleMarkers('parkPoints', true);
    this.toggleMarkers('seniorCenters', true);
    this.toggleMarkers('seniorHomes', true);
  }

  toggleHeatMap() {
    if(this.state.heatMapActive) {
      this.map.removeLayer(heat);
    }
    else {
      this.map.addLayer(heat);
    }
    this.setState({ heatMapActive: !this.state.heatMapActive })
  }

  toggleMarkers(type, trigger) {
    if(trigger) {
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
      }
      dataToUse.map(val => {
        let coordinates = val.splice(xLoc, yLoc).map(i => parseFloat(i));
        if(convertUTMtoLatLong) {
          // console.log('coordinates', coordinates)
          var utm = "+proj=utm +zone=10";
          var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
          coordinates = proj4(utm,wgs84,coordinates); // convert utm 10 to lat long
          coordinates = coordinates.reverse();
        }
        let marker = L.marker(coordinates, { icon: iconToUse }).addTo(this.map);
        // let marker = L.marker(coordinates).addTo(this.map);
        marker.bindPopup(val[titleLoc]).openPopup();
      })
    }
  }

  report() {
    console.log('report')
  }

  render() {
    return (
      <div id="map-container" style={{height: "90vh"}}>
        <div id="map" style={{height: "100%"}}></div>  
        <button onClick={this.toggleHeatMap} className="btn btn-toggleMap">Toggle Heat Map</button>
        <button onClick={this.report} className="btn btn-reportButton">Report A Collision</button>
        {/* <button onClick={this.toggleMarkers} className="btn btn-toggleMarkers">Toggle Markers</button> */}
      </div>
    )
  }
}

export default Map;