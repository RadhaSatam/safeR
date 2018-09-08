import React from 'react';
import L from 'leaflet';
import "leaflet.heat";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "../css/MapComponent.css"

var heat = null;
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heatMapActive: true,
      markers: [
        [49.25765089, -123.2639868, 1, 'severe'],
        [49.26765089, -123.26398688, 1, 'mild'],
        [49.25765089, -123.2939868, 1, 'moderate'],
        [49.23765089, -123.2439868, 1, 'severe']
      ],
      markersActive: false
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
    this.toggleMarkers()
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

  toggleMarkers() {
    this.state.markers.map(val => {
      let coordinates = val.slice(0, 2).map(i => i);
      // console.log('coordinates', coordinates)
      if(this.state.markersActive) {
        this.map.removeLayer()
      }
      else {
        let marker = L.marker(coordinates).addTo(this.map);
        marker.bindPopup(val[3]).openPopup();
      }
    })
  }

  render() {
    return (
      <div id="map-container" style={{height: "90vh"}}>
        <div id="map" style={{height: "100%"}}></div>  
        <button onClick={this.toggleHeatMap} className="btn btn-toggleMap">Toggle Heat Map</button>
        <button onClick={this.toggleMarkers} className="btn btn-toggleMarkers">Toggle Markers</button>
      </div>
    )
  }
}

export default Map;