/*
author: Nathan Chen
date  : 15-Mar-2024
*/


import React, { ComponentProps, ReactNode } from "react";
import {
  Form, Input, Checkbox, Button,
  FormProps, Flex,
} from "antd";
import {
  UserOutlined, LockOutlined
} from "@ant-design/icons"
import BaseForm from "./base_form";
import {
  FormType
} from "./types"
import {
  FormConfig, InputConfig, CheckboxConfig, ButtonConfig,
  getConfig, getFormConfig, getTitleConfig, getInputConfig, getCheckboxConfig, getButtonConfig, getInputFieldRules, getFormStyle, getButtonStyle, getSubmitWidth, getInputStyle, getCheckboxStyle,
} from "./configs";


type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

interface Configs extends FormConfig{
  username: InputConfig
  password: InputConfig
  remember: CheckboxConfig | undefined
  forgot: ButtonConfig | undefined
  submit: ButtonConfig
}
const getConfigs = (configs: any): Configs => {
  configs = getConfig(configs)
  const {username, password, submit, remember, forgot, ...form} = {...configs} as Configs

  const formConfigs = getFormConfig(form, 'Login')
  return{
    username: getInputConfig(username, 'Username', '100%'),
    password: getInputConfig(password, 'Password', '100%'),
    remember: remember && getCheckboxConfig(remember, 'Remember me'),
    forgot: forgot && getButtonConfig(forgot, 'Forgot password'),
    submit: getButtonConfig(submit, '🔑 Sign In', getSubmitWidth(formConfigs)),
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

    this.configs = getConfigs(args['configs'])
  }

  private onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const event = {event: 'signin', ...values}
    this.setComponentValue(event)
  }

  onCancel = () => {
    const event = {'event': 'cancelSignin'}
    this.setComponentValue(event)
  }

  private onForgot = () => {
    const event = {'event': 'forgotPasswrod'}
    this.setComponentValue(event)
  }

  private getAddon(remember: CheckboxConfig | undefined, forgot: ButtonConfig | undefined): ReactNode{
    return <div className="signin-addon">
      {
        remember &&
        <Form.Item<FieldType> className="signin-remember"
          name="remember"
          valuePropName="checked"
          style={getCheckboxStyle(remember)}
          noStyle
        >
          <Checkbox className="signin-remember" {...remember.props}>{remember.label}
          </Checkbox>
        </Form.Item>
      }
      {
        forgot &&
        <a className="signin-forgot" onClick={this.onForgot}>Forgot password</a>
      }
    </div>
  }

  private getDefaultBody(username: InputConfig,
  password: InputConfig,
  remember: CheckboxConfig | undefined,
  forgot: ButtonConfig | undefined,
  submit: ButtonConfig) : ReactNode {
    return <div className="signin-body">
      <Form.Item<FieldType> className="signin-username" name="username"
        label={username.label}
        rules={getInputFieldRules(username)}
        style={getInputStyle(username)}
      >
        <Input className="signin-username" prefix={<UserOutlined />} {...username.props} />
      </Form.Item>

      <Form.Item<FieldType> className="signin-password" name="password"
        label={password.label}
        rules={getInputFieldRules(password)}
        style={getInputStyle(password)}
      >
        <Input.Password className="signin-password" prefix={<LockOutlined />} {...password.props} />
      </Form.Item>

      { this.getAddon(remember, forgot) }

      <Button className="signin-submit"
        type="primary"
        htmlType="submit"
        style={getButtonStyle(submit)}
        {...submit.props}
      >{submit.label}</Button>
    </div>
  }

  private getInlineBody(username: InputConfig, password: InputConfig, submit: ButtonConfig) : ReactNode {
    return <div className="signin-body">
      <Flex className="signin-body" gap='small' align='start'>
        <Form.Item<FieldType> className="signin-username" name="username"
          label={username.label}
          rules={getInputFieldRules(username)}
          style={getInputStyle(username)}
        >
          <Input className="signin-username" prefix={<UserOutlined />} {...username.props} />
        </Form.Item>

        <Form.Item<FieldType> className="signin-password" name="password"
          label={password.label}
          rules={getInputFieldRules(password)}
          style={getInputStyle(password)}
        >
          <Input.Password className="signin-password" prefix={<LockOutlined />} {...password.props} />
        </Form.Item>

        <Button className="signin-submit"
          type="primary"
          htmlType="submit"
          style={getButtonStyle(submit)}
          {...submit.props}
        >{submit.label}</Button>
      </Flex>
    </div>
  }

  private getDefaultForm(): ReactNode {
    const {title, cancel, username, password, remember, forgot, submit, ...form} = this.configs

    return(
      <Form className="signin-form" name="signin"
        labelCol={{ span: form.labelSpan }}
        wrapperCol={{ span: form.wrapperSpan }}
        style={getFormStyle(form)}
        initialValues={ this.default }
        onFinish={this.onFinish}
        {...form.props}
      >
        { this.getHeader(title, cancel) }
        { this.getDefaultBody(username, password, remember, forgot, submit) }
        
      </Form>
    )
  }
  
  private getInlineForm(): ReactNode {
    const {title, cancel, username, password, remember, forgot, submit, ...form} = this.configs

    return(
      <Form className="signin-form" name="signin"
        labelCol={{ span: form.labelSpan }}
        wrapperCol={{ span: form.wrapperSpan }}
        style={getFormStyle(form)}
        initialValues={this.default}
        onFinish={this.onFinish}
        {...form.props}
      >
        { this.getHeader(title, cancel) }
        { this.getInlineBody(username, password, submit) }
        { this.getAddon(remember, forgot)}
        
      </Form>
    )
  }

  getForm(): ReactNode {
    const {type} = this.configs
    if (type === FormType.inline) return this.getInlineForm()
    else return this.getDefaultForm()
  }
}