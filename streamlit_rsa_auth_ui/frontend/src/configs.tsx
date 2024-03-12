/*
author: Nathan Chen
date  : 12-Mar-2024
*/


import
{
  TextAlign, TitleSize,
  getTextAlign, getTitleSize,
} from "./types"
import {
  InputProps,
  FormProps, 
  CheckboxProps,
  ButtonProps} from "antd"
import { 
  TitleProps
} from "antd/es/typography/Title"


export const getConfig = (config: any): any => (typeof config === 'object') ? config : {}
const getString = (text: any, defaultText: string): string => (typeof text === 'string') ? text : defaultText


export interface TitleConfig{
  text: string
  size: TitleSize
  align: TextAlign
  props: TitleProps
}
export const getTitleConfig = (config: any, defaultText: string, defaultSize: TitleSize = TitleSize.medium, defaultAlign: TextAlign = TextAlign.left) : TitleConfig => {
  config = getConfig(config)
  const {text, size, align, ...rest} = config

  return {
    text: getString(text, defaultText),
    size: getTitleSize(size, defaultSize),
    align: getTextAlign(align, defaultAlign),
    props: rest
  } as TitleConfig
}

export interface FormItemConfig{
  label: string | undefined
  error_message: string | undefined
}

export interface InputConfig extends FormItemConfig{
  props: InputProps
}
export const getInputConfig = (config: any, defaultLabel: string) : InputConfig => {
  config = getConfig(config)
  const {label, error_message, ...rest} = config

  return{
    label: label || (!label && !rest.props?.placeholder) ? defaultLabel : undefined,
    error_message: error_message,
    props: rest
  }
}


export interface CheckboxConfig extends FormItemConfig {
  props: CheckboxProps
}
export const getCheckboxConfig = (config: any, defaultLabel: string) : CheckboxConfig => {
  config = getConfig(config)
  const {label, error_message, ...rest} = config

  return {
    label: getString(label, defaultLabel),
    error_message: error_message,
    props: rest
  }
}


export interface ButtonConfig extends FormItemConfig {
  props: ButtonProps
}
export const getButtonConfig = (config: any, defaultLabel: string) : ButtonConfig => {
  config = getConfig(config)
  const {label, error_message, ...rest} = config

  return {
    label: getString(label, defaultLabel),
    error_message: error_message,
    props: rest
  }
}


export interface FormConfig{
  labelSpan: number | undefined,
  maxWidth: number | undefined,
  props: FormProps
}
export const getFormConfig = (config: any, defaultLabelSpan: number | undefined = undefined, defaultMaxWidth: number | undefined = undefined) => {
  config = getConfig(config)
  const {labelSpan, maxWidth, ...rest} = config

  if (!rest.labelAlign) rest.labelAlign = 'right' as FormProps['labelAlign']
  if (!rest.autoComplete) rest.autoComplete = 'off' as FormProps['autoComplete']
  return {
    labelSpan: (typeof labelSpan != 'number') ? defaultLabelSpan : labelSpan,
    maxWidth: (typeof maxWidth != 'number') ? defaultMaxWidth : maxWidth,
    props: rest
  }
}