import React from 'react';
import L from 'leaflet';
import "leaflet.heat";

class Map extends React.Component {
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

    let addressPoints = [
      [49.25765089, -123.2639868, 1],
      [48.25765089, -123.2639868, 1],
      [55.25765089, -111.2639868, 1],
      [49.25765089, -122.2639868, 1],
      [53.25765089, -123.2639868, 1],
      [49.25765089, -129.26, 1]
    ]
    for(var i=0;i<1000; i++){
      addressPoints.push([49.25765089+(Math.random()*7-3),
                        -123.2639868+(Math.random()*7-3),
                        0.65]);
    }

    for(var i=0;i<1000; i++){
      addressPoints.push([49.25765089+(Math.random()*7-3),
                        -123.2639868+(Math.random()*7-3),
                        1]);
    }
    
    
    var heat = L.heatLayer(addressPoints, {maxZoom: 10, radius: 20, max: 1.0, gradient: {0.4: 'yellow', 0.65: 'lime', 1: 'red'}}).addTo(this.map);
  }
  render() {
    return <div id="map" style={{height: "90vh"}}></div>
  }
}

export default Map;