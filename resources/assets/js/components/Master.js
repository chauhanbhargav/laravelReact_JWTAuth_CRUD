import React from 'react';
import {Layout} from 'antd';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import {Route, Switch} from 'react-router-dom';

class Master extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout className="main-layout">
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/dashboard' component={Dashboard}/>
                </Switch>
            </Layout>
        )
    }
}
export default Master;