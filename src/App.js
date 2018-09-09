import React, { Component } from 'react';

import './css/App.css';

import MapComponent from './components/MapComponent';
class App extends Component {
  render() {
    return (
      <div className="App">
        <MapComponent/>
      </div>
    );
  }
}

export default App;
