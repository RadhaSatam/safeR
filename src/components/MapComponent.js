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
      center: [49.25765089, -123.2639868],
      zoom: 11,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    // add heatmap
    let addressPoints = [
      [49.25765089, -123.2639868, 1],
      [48.25765089, -123.2639868, 1],
      [55.25765089, -111.2639868, 1],
      [49.25765089, -122.2639868, 1],
      [53.25765089, -123.2639868, 1],
      [49.25765089, -129.26, 1]
    ]
    for(let i=0;i<1000; i++){
      addressPoints.push([49.25765089+(Math.random()*7-3),
                        -123.2639868+(Math.random()*7-3),
                        0.65]);
    }

    for(let i=0;i<1000; i++){
      addressPoints.push([49.25765089+(Math.random()*7-3),
                        -123.2639868+(Math.random()*7-3),
                        1]);
    }
    
    
    heat = L.heatLayer(addressPoints, {maxZoom: 10, radius: 20, max: 1.0, gradient: {0.4: 'yellow', 0.65: 'lime', 1: 'red'}}).addTo(this.map);

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
      let dataToUse = null;
      switch(type) {
        case 'communityCenters': {
          dataToUse = communityCenters;
          break;
        }
        case 'hospitals': {
          dataToUse = hospitals;
          break;
        }
        case 'parkPoints': {
          dataToUse = parkPoints;
          break;
        }
        case 'seniorCenters': {
          dataToUse = seniorCenters;
          break;
        }
        case 'seniorHomes': {
          dataToUse = seniorHomes;
          break;
        }
      }
      dataToUse.map(val => {
        let coordinates = val.splice(4, 6).map(i => parseFloat(i));
        // console.log('coordinates', coordinates)
        var utm = "+proj=utm +zone=10";
        var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
        coordinates = proj4(utm,wgs84,coordinates); // convert utm 10 to lat long
        coordinates = coordinates.reverse();
        let marker = L.marker(coordinates).addTo(this.map);
        marker.bindPopup(val[1]).openPopup();
      })
    }
  }

  render() {
    return (
      <div id="map-container" style={{height: "90vh"}}>
        <div id="map" style={{height: "100%"}}></div>  
        <button onClick={this.toggleHeatMap} className="btn btn-toggleMap">Toggle Heat Map</button>
        {/* <button onClick={this.toggleMarkers} className="btn btn-toggleMarkers">Toggle Markers</button> */}
      </div>
    )
  }
}

export default Map;