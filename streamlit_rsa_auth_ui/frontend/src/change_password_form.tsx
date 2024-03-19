/*
author: Nathan Chen
date  : 15-Mar-2024
*/


import React, { ComponentProps, ReactNode } from "react";
import {
  Form, Typography, Input, Checkbox, Space, Button,
  FormProps, Flex,
} from "antd";
import {
  UserOutlined, LockOutlined, UnlockOutlined
} from "@ant-design/icons"
import BaseForm from "./base_form";
import {
  FormType
} from "./types"
import {
  FormConfig, TitleConfig, InputConfig, CheckboxConfig, ButtonConfig,
  getConfig, getFormConfig, getTitleConfig, getInputConfig, getCheckboxConfig, getButtonConfig,
} from "./configs";


type FieldType = {
  current: string;
  new: string;
  confirm: string;
};


interface Configs extends FormConfig{
  current: InputConfig
  newPass: InputConfig
  confirm: InputConfig
  submit: ButtonConfig
}
const getConfigs = (configs: any): Configs => {
  configs = getConfig(configs)
  const {current, newPass, confirm, submit, ...form} = {...configs} as Configs

  const formConfigs = getFormConfig(form, {
    title: {text: 'Change Password'},
    submit: {label: '🔏 Change'}
  })
  return {
    current: getInputConfig(current, {
      placeholder: 'Current password',
      width: '100%',
      required: { required: true }
    }),
    newPass: getInputConfig(newPass, {
      placeholder: 'New password',
      width: '100%',
      required: { required: true }
    }),
    confirm: getInputConfig(confirm, {
      placeholder: 'Confirm password',
      width: '100%',
      required: { required: true }
    }),
    ...formConfigs
  }
}


export default class ChangePasswordForm extends BaseForm{
  private configs: Configs
  private default: FieldType

  constructor(props: ComponentProps<any>){
    super(props)
    const args = props.args

    this.default = args['default'] || {}
    this.configs = getConfigs(args['configs'])
  }

  onCancel = () => {
    const event = {event: 'cancelChangePassword'}
    this.setComponentValue(event)
  };

  private getDefaultBody(current: InputConfig,
  newPass: InputConfig,
  confirm: InputConfig | undefined,
  submit: ButtonConfig) : ReactNode {
    return <div className="change-password-body">
      <Form.Item<FieldType> className="change-password-current" name="current" {...current.formItemProps}>
        <Input.Password className="change-password-current" prefix={<LockOutlined />} {...current.props} />
      </Form.Item>

      <Form.Item<FieldType> className="change-password-new" name="new" {...newPass.formItemProps}>
        <Input.Password className="change-password-new" prefix={<UnlockOutlined />} {...newPass.props} />
      </Form.Item>

      {
        confirm &&
        <Form.Item<FieldType> className="change-password-confirm" name="confirm" {...confirm.formItemProps}>
          <Input.Password className="change-password-confirm" prefix={<UnlockOutlined />} {...confirm.props} />
        </Form.Item>
      }

      <Button className="change-password-submit" type="primary" htmlType="submit" {...submit.props}>
        {submit.text}
      </Button>
    </div>
  }

  private getInlineBody(current: InputConfig, newPass: InputConfig, confirm: InputConfig, submit: ButtonConfig) : ReactNode {
    return <div className="change-password-body">
      <Flex className="change-password-body" gap='small' align='start'>
        <Form.Item<FieldType> className="change-password-current" name="current" {...current.formItemProps}>
          <Input.Password className="change-password-current" prefix={<LockOutlined />} {...current.props} />
        </Form.Item>

        <Form.Item<FieldType> className="change-password-new" name="new" {...newPass.formItemProps}>
          <Input.Password className="change-password-password" prefix={<UnlockOutlined />} {...newPass.props} />
        </Form.Item>

        {
          confirm &&
          <Form.Item<FieldType> className="change-password-confirm" name="confirm" {...confirm.formItemProps}>
            <Input.Password className="change-password-password" prefix={<UnlockOutlined />} {...confirm.props} />
          </Form.Item>
        }

        <Button className="change-password-submit" type="primary" htmlType="submit" {...submit.props}>
          {submit.text}
        </Button>
      </Flex>
    </div>
  }

  private getDefaultForm(): ReactNode {
    const {title, cancel, current, newPass, confirm, submit, ...form} = this.configs

    return(
      <Form className="change-password-form" name="change-password" initialValues={ this.default } onFinish={this.onFinish} {...form.props}>
        { this.getHeader(title, cancel) }
        { this.getDefaultBody(current, newPass, confirm, submit) }
      </Form>
    )
  }
  
  private getInlineForm(): ReactNode {
    const {title, cancel, current, newPass, confirm, submit, ...form} = this.configs

    return(
      <Form className="change-password-form" name="change-password" initialValues={this.default} onFinish={this.onFinish} {...form.props}>
        { this.getHeader(title, cancel) }
        { this.getInlineBody(current, newPass, confirm, submit) }
      </Form>
    )
  }

  private onFinish: FormProps['onFinish'] = (values) => {
    const event = {event: 'changePassword', ...values}
    this.setComponentValue(event)
  }

  getForm(): ReactNode {
    const {type} = this.configs
    if (type === FormType.inline) return this.getInlineForm()
    else return this.getDefaultForm()
  }
}
  