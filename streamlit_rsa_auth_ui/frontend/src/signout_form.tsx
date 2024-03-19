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
  getConfig, getFormConfig,
} from "./configs";
import { FormType } from "./types";

const getConfigs = (configs: any): FormConfig => {
  configs = getConfig(configs)
  const {...form} = {...configs} as FormConfig

  const formConfigs = getFormConfig(form, {
    type: FormType.default,
    title: {text: "Welcome"},
    submit: {label: '🔐 Sign Out'},
  })
  return formConfigs
}

export default class SignoutForm extends BaseForm{
  private configs: FormConfig

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
      <Form className="signout-form" name='signout' onFinish={this.onFinish} {...form.props}>
        { this.getHeader(title, cancel) }
        <Button className="signout-submit" type='primary' htmlType='submit' {...submit.props}>
          {submit.text}
        </Button>
      </Form>
    )
  }
}