import React from 'react';
import reqwest from 'reqwest';
import Link from 'react-router-dom';
import {
    Layout, Menu, Breadcrumb,
    Table, Icon
} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Footer, Content} = Layout;

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    filters: [{
        text: 'Joe',
        value: 'Joe',
    }, {
        text: 'Jim',
        value: 'Jim',
    }, {
        text: 'Submenu',
        value: 'Submenu',
        children: [{
            text: 'Green',
            value: 'Green',
        }, {
            text: 'Black',
            value: 'Black',
        }],
    }],

    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
}, {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
}, {
    title: 'Address',
    dataIndex: 'address',
    filters: [{
        text: 'London',
        value: 'London',
    }, {
        text: 'New York',
        value: 'New York',
    }],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
}];

function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
}

class Dashboard extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
        current: 'mail'
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };
    fetch = (params = {}) => {
        this.setState({loading: true});
        reqwest({
            url: 'https://randomuser.me/api',
            method: 'get',
            data: {
                results: 10,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            const pagination = {...this.state.pagination};
            pagination.total = 200;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        });
    };

    handleClick = (event) => {
        switch (event.key) {
            case ('logout'):
                return this.props.history.push('/');
        }
    };

    componentDidMount() {
        this.fetch();
    };

    render() {
        return (
            <Layout>
                <Header style={{padding: 0}}>
                    <div className="col-lg-6 pull-left">
                        <Menu
                            style={{
                                backgroundColor: '#404040',
                                borderBottom: '1px solid #404040',
                                color: '#fff',
                                paddingTop: '15px'
                            }}
                            selectedKeys={[this.state.current]}
                            mode="horizontal">
                            <SubMenu className="pull-left"
                                     title="Laravel React">
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className="col-lg-6 pull-right">
                        <Menu
                            style={{
                                backgroundColor: '#404040',
                                borderBottom: '1px solid #404040',
                                color: '#fff',
                                paddingTop: '15px'
                            }}
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal">
                            <SubMenu className="pull-right"
                                     title={<span><Icon type="user"/>Administrator</span>}>
                                <Menu.Item key="dashboard">
                                    {<span><Icon type="home"/>Dashboard</span>}
                                </Menu.Item>
                                <Menu.Item key="github">
                                    {<span><Icon type="github"/>Github</span>}
                                </Menu.Item>
                                <Menu.Item key="logout" onclick={this.signOut}>
                                    <Icon type="poweroff"/>
                                    <span>Sign out</span>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                </Header>
                <Layout>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '12px 0'}}></Breadcrumb>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                            <Table columns={columns} dataSource={data} onChange={onChange}/>
                        </Content>
                    </Layout>
                    <Footer style={{textAlign: 'center'}}>
                        Laravel React ©2017 Created by Bhargav Chauhan
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Dashboard;