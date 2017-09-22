import React from 'react';
import {
    Form, Input, Spin,
    Button, Layout
} from 'antd';
import {Link} from 'react-router-dom';
const {Content} = Layout;
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Content>
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid text-center">
                            <h3>Login</h3>
                        </div>
                    </nav>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3 text-center">
                            <Form onSubmit={this.handleSubmit} className="login-form">
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
                                <FormItem>
                                    <br/>
                                    <Button type="primary" htmlType="submit" className="btn btn-primary">Login</Button>
                                </FormItem>
                                <FormItem>
                                    <br/>
                                    <Link to="/signup">Go To Signup</Link>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}
export default Form.create()(Login);