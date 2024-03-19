/*
author: Nathan Chen
date  : 15-Mar-2024
*/


import React, { ComponentProps, ReactNode } from "react";
import {
  Form, Input, Checkbox, Button,
  FormProps, Flex, InputNumber,
} from "antd";
import {
  UserOutlined, LockOutlined
} from "@ant-design/icons"
import BaseForm from "./base_form";
import {
  FormType, InputType
} from "./types"
import {
  FormConfig, InputConfig, CheckboxConfig, ButtonConfig,
  getConfig, getFormConfig, getTitleConfig, getInputConfig, getCheckboxConfig, getButtonConfig, CustomInputConfig, getCustomInputConfig,
} from "./configs";


interface Configs extends FormConfig{
  username: InputConfig
  password: InputConfig
  fields: CustomInputConfig[]
}
const getConfigs = (configs: any): Configs => {
  configs = getConfig(configs)
  const {username, password, submit, ...form} = configs

  const fields: CustomInputConfig[] = []
  let name: keyof typeof form
  for (name in form){
    const {type, defaultConfig, ...inputProp} = form[name] as CustomInputConfig
    if(Object.values(InputType).includes(type)){
      const config = getCustomInputConfig(type, name, inputProp, defaultConfig)
      if(config){
        fields.push(config)
        delete form[name]
      }
    }
  }

  const formConfigs = getFormConfig(form, 'Register')
  return {
    username: username,
    password: password,
    fields: fields,
    ...formConfigs
  }
}

const getInput = (config: CustomInputConfig): ReactNode => {
  return <Form.Item className={`register-${config.name}`} name={config.name}>
    <InputNumber
      style={{width: '100%'}}
      {...config.config.props}
    />
  </Form.Item>
}


export default class RegisterForm extends BaseForm{
  private configs: Configs
  private default: any

  constructor(props: ComponentProps<any>){
    super(props)
    const args = props.args

    this.default = args['default'] || {}
    this.configs = getConfigs(args['configs'])
  }

  onCancel = () => {
    const event = {event: 'cancelRegister'}
    this.setComponentValue(event)
  }

  getForm(): ReactNode {
    const {title, cancel, username, password, submit, fields, ...form} = this.configs

    return <Form className='register-form' name='register' initialValues={this.default} {...form.props}>
      {this.getHeader(title, cancel)}
      {fields.map(config => getInput(config))}
    </Form>
  }
}