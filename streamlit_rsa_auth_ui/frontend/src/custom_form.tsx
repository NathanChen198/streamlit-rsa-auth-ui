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
  fields: CustomInputConfig[][]
}
const getConfigs = (configs: any, _default: any) => {
  const form = getConfig(configs)
  _default = getConfig(_default)

  const fields: CustomInputConfig[] = []
  const names = Object.keys(form)
  names.forEach(name => {
    const {type, ...rest} = form[name]
    if(Object.values(InputType).includes(type)){
      const config = getCustomInputConfig(type, name, rest, _default[name])
      if (config){
        fields.push(config)
        delete form[name]
      }
    }
  })
}