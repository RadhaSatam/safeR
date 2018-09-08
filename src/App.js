import React, { Component } from 'react';
// import loadGoogleMapsApi from 'load-google-maps-api';

import './css/App.css';

import Header from './components/layout/Header';
import MapComponent from './components/MapComponent';
class App extends Component {
  componentDidMount() {
    // loadGoogleMapsApi({
    //   key:'AIzaSyBCYokxzfzicK7MU-_CWm3bZxaqXbn86Zk',
    //   language: 'en'
    // }).then(function (googleMaps) {
    //   this.map = new googleMaps.Map(document.querySelector('.map'), {
    //     center: {
    //       lat: 41.850033,
    //       lng: -87.6500523
    //     },
    //     zoom: 13,
    //   });

    //   var layer = new google.maps.FusionTablesLayer({
    //     query: {
    //       select: 'location',
    //       from: '1xWyeuAhIFK_aED1ikkQEGmR8mINSCJO9Vq-BPQ'
    //     },
    //     heatmap: {
    //       enabled: true
    //     }
    //   });
    //   layer.setMap(this.map);
    // }).catch(function (error) {
    //   console.error(error)
    // })
  }
  render() {
    return (
      <div className="App">
        <Header/>
        {/* <div className="map" style={{width: "100%", height: "450px"}}></div> */}
        <MapComponent/>
      </div>
    );
  }
}

export default App;
