import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "./utils/firebaseConfig";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
