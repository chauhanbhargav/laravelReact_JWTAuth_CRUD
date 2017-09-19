import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

class Master extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">LaraReact</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/insert">Insert</Link></li>
                            <li><Link to="/update">Update</Link></li>
                            <li><Link to="/view">View</Link></li>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </div>
        )
    }
}
export default Master;