
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { addressPoints } from '../data/addressPoints';

class MapComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        lat: 49.2578262,
        lng: -123.194116,
        zoom: 12,
      }
    }
    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom}>
              <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={addressPoints}
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])} 
              />
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                grayscale={true}
              />
              <Marker position={position}>
                <Popup>
                  Hello, Vancouver
                </Popup>
              </Marker>
          </Map>
        )
    }
}

export default MapComponent;