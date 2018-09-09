import React, { Component } from 'react';

import './css/App.css';

import Header from './components/layout/Header';
import MapComponent from './components/MapComponent';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <MapComponent/>
      </div>
    );
  }
}

export default App;
