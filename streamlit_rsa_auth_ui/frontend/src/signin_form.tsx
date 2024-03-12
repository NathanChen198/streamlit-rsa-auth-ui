/*
author: Nathan Chen
date  : 12-Mar-2024
*/


import React, { ComponentProps } from "react";
import {
  Form, Typography, Input, Checkbox, Space, Button,
  type FormProps,
  ButtonProps,
} from "antd";
import BaseForm from "./base_form";
import {
  FormConfig, TitleConfig, InputConfig, CheckboxConfig, ButtonConfig,
  getConfig, getFormConfig, getTitleConfig, getInputConfig, getCheckboxConfig, getButtonConfig,
} from "./configs";

const { Title } = Typography


type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

interface Configs extends FormConfig{
  username: InputConfig
  password: InputConfig
  signin: ButtonConfig
  title: TitleConfig | undefined
  remember: CheckboxConfig | undefined
  cancel: ButtonConfig | undefined
}
const getConfigs = (configs: any, defaultLabelSpan: number, defaultMaxWidth: number): Configs => {
  configs = getConfig(configs)
  const {username, password, signin, title, remember, cancel, ...form} = {...configs} as Configs

  const formConfigs = getFormConfig(form, defaultLabelSpan, defaultMaxWidth)
  return{
    username: getInputConfig(username, 'Username'),
    password: getInputConfig(password, 'Password'),
    signin: getButtonConfig(signin, '🔑 Sign In'),
    title: title && getTitleConfig(title, 'Login'),
    remember: remember && getCheckboxConfig(remember, 'Remember me'),
    cancel: cancel && getButtonConfig(cancel, 'Cancel'),
    ...formConfigs
  }
}

export default class SigninForm extends BaseForm{
  private configs: Configs
  private default: FieldType

  constructor(props: ComponentProps<any>){
    super(props)
    const args = props.args
    
    this.default = args['default'] || {}
    this.default.remember = this.default.remember === false ? false : true

    this.configs = getConfigs(args['configs'], 4, 500)
  }

  private onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const event = {'event': 'signin', ...values}
    this.setComponentValue(event)
  }

  private onCancel: ButtonProps['onClick'] = () => {
    const event = {'event': 'cancelSignin'}
    this.setComponentValue(event)
  }

  getForm(): React.ReactNode {
    const {username, password, signin, title, remember, cancel, ...form} = this.configs
    return(
      <Form
        name="signin"
        labelCol={{span: form.labelSpan}}
        style={{ maxWidth: form.maxWidth }}
        initialValues={ this.default }
        onFinish={this.onFinish}
        {...form.props}
      >
        {
          title &&
          <Form.Item style={{textAlign: title.align}}><Title level={title.size} {...title.props}>{title.text}</Title></Form.Item>
        }

        <Form.Item<FieldType>
          label={username.label}
          name="username"
          rules={[{ required: true, message: username.error_message }]}
        >
          <Input {...username.props} />
        </Form.Item>

        <Form.Item<FieldType>
          label={password.label}
          name="password"
          rules={[{ required:true, message: password.error_message }]}
        >
          <Input.Password {...password.props} />
        </Form.Item>

        <Form.Item>
          <Space align="start">
            {
              remember &&
              <Form.Item<FieldType> name="remember" valuePropName="checked">
                <Checkbox {...remember.props}>{remember.label}</Checkbox>
              </Form.Item>
            }

            <Form.Item>
              <Button type="primary" htmlType="submit" {...signin.props}>{signin.label}</Button>
            </Form.Item>

            {
              cancel &&
              <Form.Item>
                <Button onClick={this.onCancel} {...cancel.props}>{cancel.label}</Button>
              </Form.Item>
            }
          </Space>
        </Form.Item>
      </Form>
    )
  }
}