import React from 'react';
import {
    Form, Input, Spin,
    Button, Layout
} from 'antd';
const {Content} = Layout;
import {Link} from 'react-router-dom';
const FormItem = Form.Item;

class Signup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Content>
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid text-center">
                            <h3>Signup</h3>
                        </div>
                    </nav>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3 text-center">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: 'Please input your username!'}]
                                    })(
                                        <Input placeholder="Username" className="form-control"/>
                                    )}
                                </FormItem>
                                <br/>
                                <FormItem>
                                    {getFieldDecorator('email', {
                                        rules: [{required: true, message: 'Please input your email!'}]
                                    })(
                                        <Input placeholder="Email" className="form-control"/>
                                    )}
                                </FormItem>
                                <br/>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}]
                                    })(
                                        <Input type="password"
                                               placeholder="Password" className="form-control"/>
                                    )}
                                </FormItem>
                                <br/>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Confirm Password!'}]
                                    })(
                                        <Input type="confirmpassword" className="form-control"
                                               placeholder="Confirm Password"/>
                                    )}
                                </FormItem>
                                <br/>
                                <FormItem>
                                    <br/>
                                    <Button type="primary" htmlType="submit" className="btn btn-primary">Signup</Button>
                                </FormItem>
                                <FormItem>
                                    <br/>
                                    <Link to="/">Go To Login</Link>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}
export default Form.create()(Signup);
