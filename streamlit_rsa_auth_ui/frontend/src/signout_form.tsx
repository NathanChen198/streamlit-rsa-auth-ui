/*
author: Nathan Chen
date  : 16-Mar-2024
*/


import React, { ComponentProps, ReactNode } from "react";
import {
  Form, Button,
  type FormProps,
} from "antd";
import BaseForm from "./base_form";
import {
  FormConfig, ButtonConfig,
  getTitleConfig, getButtonConfig, getConfig, getFormConfig, getFormStyle, getSubmitWidth, getButtonStyle,
} from "./configs";
import { autobind } from "core-decorators";

interface Configs extends FormConfig {
  submit: ButtonConfig
}
const getConfigs = (configs: any): Configs => {
  configs = getConfig(configs)
  const {submit, ...form} = {...configs} as Configs

  const formConfigs = getFormConfig(form, "Welcome")
  return {
    submit: getButtonConfig(submit, '🔐 Sign Out', getSubmitWidth(formConfigs)),
    ...formConfigs
  }
}

@autobind
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

  onCancel = () => {
    const event = {'event': 'cancelSignout'}
    this.setComponentValue(event)
  }
  getForm(): ReactNode {
    const {submit, cancel, title, ...form} = this.configs
    return(
      <Form className="signout-form" name='signout'
        style={getFormStyle(form)}
        onFinish={this.onFinish}
        {...form.props}
      >
        { this.getHeader(title, cancel) }
        <Button className="signout-submit"
          type='primary'
          htmlType='submit'
          style={getButtonStyle(submit)}
          {...submit.props}
        >{submit.label}</Button>
      </Form>
    )
  }
}