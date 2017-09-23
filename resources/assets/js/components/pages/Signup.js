import React from 'react';
import {
    Form, Input, Tooltip,
    Icon, Checkbox, Spin, AutoComplete,
    Button, Layout, notification
} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';

const {Content} = Layout;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
const signupNotification = (type) => {
    notification[type]({
        message: 'Registration Complete',
        description: 'Thank you for registering with us.',
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

    //  From Submit
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let self = this;
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
                        self.setState({
                            isLoading: false
                        });
                        if (res.data.meta.status === 'ok') {
                            self.props.form.setFieldsValue({
                                ["nickname"]: null,
                            });
                            self.props.form.setFieldsValue({
                                ["email"]: null,
                            });
                            self.props.form.setFieldsValue({
                                ["password"]: null,
                            });
                            self.props.form.setFieldsValue({
                                ["confirm"]: null,
                            });
                            signupNotification('success');
                        } else {
                            signupNotification('error');
                        }
                    })
            }
        });
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

        const {autoCompleteResult} = this.state;

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

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