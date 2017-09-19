require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
import Master from './components/Master';
import Insert from './components/Insert';
import Home from './components/home';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Master}>
            <IndexRoute component={Home}/>
            <Route path="/insert" component={Insert}/>
        </Route>
    </Router>

), document.getElementById('app'));