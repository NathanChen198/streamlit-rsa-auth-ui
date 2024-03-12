/*
author: Nathan Chen
date  : 12-Mar-2024
*/


import React, { ComponentProps } from "react";
import {
  Form, Typography, Space, Button,
  type FormProps,
} from "antd";
import BaseForm from "./base_form";
import {
  FormConfig, TitleConfig, ButtonConfig,
  getTitleConfig, getButtonConfig, getConfig, getFormConfig,
} from "./configs";

const { Title } = Typography

interface Configs extends FormConfig {
  signout: ButtonConfig
  title: TitleConfig | undefined
}
const getConfigs = (configs: any): Configs => {
  configs = getConfig(configs)
  const {signout, title, ...form} = {...configs} as Configs

  const formConfigs = getFormConfig(form)
  return {
    signout: getButtonConfig(signout, '🔐 Sign Out'),
    title: title ? getTitleConfig(title, "Welcome") : undefined,
    ...formConfigs
  }
}

export default class SignoutForm extends BaseForm{
  private configs: Configs

  constructor(props: ComponentProps<any>){
    super(props)
    this.configs = getConfigs(props.args['configs'])
  }

  private onFinish: FormProps['onFinish'] = () => {
    const event = {'event': 'signout'}
    this.setComponentValue(event)
  }

  getForm(): React.ReactNode {
    const {signout, title, ...form} = this.configs
    return(
      <Form
        name='signout'
        style = {{ maxWidth: form.maxWidth }}
        onFinish={this.onFinish}
        {...form.props}
      >
        {
          title &&
          <Form.Item style={{textAlign: title.align}}><Title level={title.size} {...title.props}>{title.text}</Title></Form.Item>
        }

        <Space align="start">
          <Form.Item>
            <Button type='primary' htmlType='submit' {...signout.props}>{signout.label}</Button>
          </Form.Item>
        </Space>
      </Form>
    )
  }
}