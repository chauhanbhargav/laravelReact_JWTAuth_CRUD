import React from 'react';
import {
    Form, Input, Checkbox, Button,
    Layout, Spin, notification
} from 'antd';
import {Link} from 'react-router-dom';

const {Content} = Layout;
const FormItem = Form.Item;
const loginNotification = (type, val, msg) => {
    notification[type]({
        message: val,
        description: msg,
    });
};

class Signup extends React.Component {
    //  Default State
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        isLoading: false,
        errorMessage: null
    };

    //  Login Submit
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let self = this;
                this.setState({
                    isLoading: true
                });
                let params = {
                    emailId: this.props.form.getFieldValue("email"),
                    password: this.props.form.getFieldValue("password")
                };
                axios.post('/api/login', params)
                    .then(function (res) {
                        self.setState({
                            isLoading: false
                        });
                        if (res.data.meta.status === 'ok') {
                            loginNotification('success', 'Success', res.data.meta.message);
                        } else {
                            loginNotification('error', 'Error', res.data.meta.message);
                        }
                    })
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

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
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Email Id"
                                    hasFeedback>
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            type: 'email', message: 'The input is not valid E-mail!',
                                        }, {
                                            required: true, message: 'Please input your E-mail!',
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Password"
                                    hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: 'Please input your Password!',
                                        }, {
                                            validator: this.checkConfirm,
                                        }],
                                    })(
                                        <Input type="password"/>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                                    {getFieldDecorator('agreement', {
                                        valuePropName: 'checked',
                                    })(
                                        <Checkbox className="pull-right">Remember me</Checkbox>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">Login</Button>
                                    <br/>
                                    <Link to="/signup">Register Now !</Link>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </Content>
        );
    }
}

export default Form.create()(Signup);