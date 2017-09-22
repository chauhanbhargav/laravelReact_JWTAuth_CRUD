require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import Master from './components/Master';
import {
    HashRouter,
    Route
} from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <Master/>
    </HashRouter>,
    document.getElementById('react-lara')
);