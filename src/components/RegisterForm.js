import React, { Component } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";

import getUser from "../api/github";

const FormItem = Form.Item;
const Option = Select.Option;

class RegisterForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        getUser(values).then(response => {
          console.log(response);
        });
      }
    });
  };

  handlePhone = (rule, value, callback) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!(value && value.match(phoneno))) {
      callback("Wrong format！");
    }
    callback();
  };

  handleBirthdate = (rule, value, callback) => {
    var today = new Date();
    if (today < value) {
      callback("Future date is not allowed！");
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "1"
    })(
      <Select style={{ width: 70 }}>
        <Option value="1">+1</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="First Name">
          {getFieldDecorator("fname", {
            rules: [{ required: true, message: "Please input First Name!" }]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Last Name">
          {getFieldDecorator("lname", {
            rules: [{ required: true, message: "Please input Last Name!" }]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" },
              {
                validator: this.handlePhone
              }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="DatePicker">
          {getFieldDecorator("birthdate", {
            rules: [
              {
                required: true,
                message: "Please input your correct Birthdate!"
              },
              {
                validator: this.handleBirthdate
              }
            ]
          })(<DatePicker />)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegisterForm = Form.create()(RegisterForm);

export default WrappedRegisterForm;
