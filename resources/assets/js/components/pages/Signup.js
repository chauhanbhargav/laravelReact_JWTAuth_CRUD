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
        this.state = {
            errorMessage: null,
            isLoading: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
    }

    _renderMessage() {
        if (this.state.errorMessage === null)
            return null;
        return (
            <Row type="flex" align="center">
                <Col span={4}>
                    <Tag className="text-center" color="red">
                        {this.state.errorMessage}
                    </Tag>
                </Col>
            </Row>
        )
    };

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
                    <Spin tip="Loading..." spinning={this.state.isLoading}>
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
                                            rules: [{
                                                required: true, message: 'Please input your password!',
                                            }],
                                        })(
                                            <Input type="password"
                                                   placeholder="Password" className="form-control"/>
                                        )}
                                    </FormItem>
                                    <br/>
                                    <FormItem>
                                        {getFieldDecorator('confirm', {
                                            rules: [{
                                                required: true, message: 'Please confirm your password!',
                                            }],
                                        })(
                                            <Input type="password" className="form-control"
                                                   placeholder="Confirm Password"/>
                                        )}
                                    </FormItem>
                                    <br/>
                                    <FormItem>
                                        <br/>
                                        <Button type="primary" htmlType="submit"
                                                className="btn btn-primary">Signup</Button>
                                    </FormItem>
                                    <FormItem>
                                        <br/>
                                        <Link to="/">Go To Login</Link>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                        {this._renderMessage()}
                    </Spin>
                </div>
            </Content>
        )
    }
}
export default Form.create()(Signup);
