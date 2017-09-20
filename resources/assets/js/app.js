require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Master from './components/Master';
import Insert from './components/Insert';
import View from './components/View';

ReactDOM.render(<Master/>, document.getElementById('app'));