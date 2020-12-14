import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {register as registerServiceWorker} from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'; // <== !!!
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vertical-timeline-component/style.min.css';

import './index.css';

ReactDOM.render(
  <Router><App /></Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
registerServiceWorker();