import React from 'react';
import {
    Form, Input, Tooltip,
    Icon, Checkbox, Spin,
    Button, Layout, Alert
} from 'antd';
import {Link} from 'react-router-dom';
const {Content} = Layout;
import axios from 'axios';
const FormItem = Form.Item;


//  Alert Close
const onClose = function (e) {
    console.log(e, 'I was closed.');
};


class Signup extends React.Component {
    //  Default State

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        isLoading: false,
        errorMessage: null
    };

    //  From Submit
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var self = this;
                this.setState({
                    isLoading: true
                });
                let params = {
                    userName: this.props.form.getFieldValue("nickname"),
                    emailId: this.props.form.getFieldValue("email"),
                    password: this.props.form.getFieldValue("password")
                };
                axios.post('/api/signup', params)
                    .then(function (res) {
                        if (res.data.meta.status === 'ok') {
                            self.setState({
                                isLoading: false,
                                errorMessage: 200
                            });
                        } else {
                            self.setState({
                                isLoading: false,
                                errorMessage: 400
                            });
                        }
                        self._alertMessage();
                    })
            }
        });
    };

    //  Alert Message
    _alertMessage = () => {
        if (this.state.errorMessage === 400)
            return (
                <div>
                    <Alert
                        message="Server Error"
                        description="Opppsss....Please try again !!"
                        type="error"
                        closable
                        showIcon/>
                </div>
            );
        else if (this.state.errorMessage === 200)
            return (
                <div>
                    <Alert
                        message="Register Successfully"
                        description="Please login for enter to dashboard"
                        type="success"
                        closable
                        showIcon/>
                </div>
            );
        else
            return null;
    };

    //  Confirm Password
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    //  Check Password
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    //  Check Confirm Password
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    // Rendering
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
                            <h3>Register</h3>
                        </div>
                    </nav>
                    <div className="row">
                        <Spin tip="Loading..." spinning={this.state.isLoading}>
                            <div className="col-lg-6 col-lg-offset-3 text-center">
                                {this._alertMessage}
                                <br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                    Nickname&nbsp;
                                                <Tooltip title="What do you want other to call you?">
                                                <Icon type="question-circle-o"/>
                                            </Tooltip>
                                     </span>
                                        )}
                                        hasFeedback>
                                        {getFieldDecorator('nickname', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your nickname!',
                                                whitespace: true
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="E-mail"
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
                                                required: true, message: 'Please input your password!',
                                            }, {
                                                validator: this.checkConfirm,
                                            }],
                                        })(
                                            <Input type="password"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="Confirm Password"
                                        hasFeedback>
                                        {getFieldDecorator('confirm', {
                                            rules: [{
                                                required: true, message: 'Please confirm your password!',
                                            }, {
                                                validator: this.checkPassword,
                                            }],
                                        })(
                                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                                        {getFieldDecorator('agreement', {
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox>I have read the <a>agreement</a></Checkbox>
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">Register</Button>
                                        <br/>
                                        <Link to="/">Login Now !</Link>
                                    </FormItem>
                                </Form>
                            </div>
                        </Spin>
                    </div>
                </div>
            </Content>
        );
    }
}
export default Form.create()(Signup);