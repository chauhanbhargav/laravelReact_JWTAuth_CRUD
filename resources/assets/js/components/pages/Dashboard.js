import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Footer, Sider, Content} = Layout;

class Dashboard extends React.Component {
    render() {
        return (
            <Layout>
                <Header><h3 style={{color: '#fff'}}>Laravel React</h3></Header>
                <Layout>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '12px 0'}}></Breadcrumb>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>

                        </Content>
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        Laravel React ©2017 Created by Bhargav Chauhan
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Dashboard;