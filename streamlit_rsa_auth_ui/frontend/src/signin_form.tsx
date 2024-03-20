/*
author: Nathan Chen
date  : 20-Mar-2024
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
  getConfig, getFormConfig, getInputConfig, getCheckboxConfig, getButtonConfig
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
}
const getConfigs = (configs: any): Configs => {
  configs = getConfig(configs)
  const {username, password, remember, forgot, ...form} = {...configs} as Configs

  const formConfigs = getFormConfig(form, {
    type: FormType.default,
    title: {text: 'Login'},
    submit: {label: '🔑 Sign In'}
  })
  return{
    username: getInputConfig(username, {
      placeholder: 'Username',
      width: '100%',
      required: { required: true }
    }),
    password: getInputConfig(password, {
      placeholder: 'Password',
      width: '100%',
      required: { required: true }
    }),
    remember: remember && getCheckboxConfig(remember, {label: 'Remember me'}),
    forgot: forgot && getButtonConfig(forgot, {label: 'Forgot password'}),
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
    const event = {event: 'cancelSignin'}
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
        <Form.Item<FieldType> className="signin-remember" name="remember" valuePropName="checked" noStyle {...remember.formItemProps}>
          <Checkbox className="signin-remember" {...remember.props}>{remember.text}</Checkbox>
        </Form.Item>
      }
      {
        forgot &&
        <a className="signin-forgot" onClick={this.onForgot} {...forgot.props}>{forgot.text}</a>
      }
    </div>
  }

  private getDefaultBody(username: InputConfig,
  password: InputConfig,
  remember: CheckboxConfig | undefined,
  forgot: ButtonConfig | undefined,
  submit: ButtonConfig) : ReactNode {
    return <div className="signin-body">
      <Form.Item<FieldType> className="signin-username" name="username" {...username.formItemProps}>
        <Input className="signin-username" prefix={<UserOutlined />} {...username.props} />
      </Form.Item>

      <Form.Item<FieldType> className="signin-password" name="password" {...password.formItemProps}>
        <Input.Password className="signin-password" prefix={<LockOutlined />} {...password.props} />
      </Form.Item>

      { this.getAddon(remember, forgot) }

      <Button className="signin-submit" type="primary" htmlType="submit" {...submit.props}
      >{submit.text}</Button>
    </div>
  }

  private getInlineBody(username: InputConfig, password: InputConfig, submit: ButtonConfig) : ReactNode {
    return <div className="signin-body">
      <Flex className="signin-body" gap='small' align='start'>
        <Form.Item<FieldType> className="signin-username" name="username" {...username.formItemProps}>
          <Input className="signin-username" prefix={<UserOutlined />} {...username.props} />
        </Form.Item>

        <Form.Item<FieldType> className="signin-password" name="password" {...password.formItemProps}>
          <Input.Password className="signin-password" prefix={<LockOutlined />} {...password.props} />
        </Form.Item>

        <Button className="signin-submit" type="primary" htmlType="submit" {...submit.props}
        >{submit.text}</Button>
      </Flex>
    </div>
  }

  private getDefaultForm(): ReactNode {
    const {title, cancel, username, password, remember, forgot, submit, ...form} = this.configs

    return(
      <Form className="signin-form" name="signin" initialValues={ this.default } onFinish={this.onFinish} {...form.props}>
        { this.getHeader(title, cancel) }
        { this.getDefaultBody(username, password, remember, forgot, submit) }
      </Form>
    )
  }
  
  private getInlineForm(): ReactNode {
    const {title, cancel, username, password, remember, forgot, submit, ...form} = this.configs

    return(
      <Form className="signin-form" name="signin" initialValues={this.default} onFinish={this.onFinish} {...form.props}>
        {this.getHeader(title, cancel)}
        {this.getInlineBody(username, password, submit)}
        {this.getAddon(remember, forgot)}
      </Form>
    )
  }

  getForm(): ReactNode {
    const {type} = this.configs
    if (type === FormType.inline) return this.getInlineForm()
    else return this.getDefaultForm()
  }
}