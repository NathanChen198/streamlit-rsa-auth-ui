/*
  author: Nathan Chen
  date  : 15-Mar-2024
*/


import { IconBaseProps } from "@ant-design/icons/lib/components/Icon"
import
{
  FormType,
  HorizontalAlignment, InputType, TitleSize,
  getTextAlign, getTitleSize,
} from "./types"
import {
  FormProps, FormItemProps,
  InputProps, InputNumberProps, CheckboxProps, ButtonProps,
} from "antd"
import { 
  TitleProps
} from "antd/es/typography/Title"

export const getConfig = (config: any): any => (typeof config === 'object') ? config : {}
const getString = (text: any, defaultText: string): string => (typeof text === 'string') ? text : defaultText


export interface TitleConfig{
  text: string
  headerStyle?: React.CSSProperties
  props: TitleProps
}
export const getTitleConfig = (config: any, _default: any) : TitleConfig => {
  config = getConfig(config)
  let {text, size, align, title, cancel, submit, ...rest} = config

  text = getString(text, _default.text)
  size = getTitleSize(size, _default.size || TitleSize.medium)
  align = getTextAlign(align, _default.align || HorizontalAlignment.left)
  const headerStyle: React.CSSProperties = {textAlign: align}
  const props: TitleProps = {level: size, ...rest}

  return {text, headerStyle, props}
}

export interface FormItemRule {
  message?: string
  warningOnly?: boolean
}
export interface FormItemRequired extends FormItemRule {
  required: boolean
}
export interface FormItemPattern extends FormItemRule {
  pattern: string
}

interface FormItemConfig{
  formItemProps: FormItemProps
}
export const getFormItemRules = (_required?: any, patterns?: any) => {
  const rules: FormItemProps['rules'] = []
  if (_required){
    const {required, ...rest} = _required
    rules.push({required, ...rest})
  }
  if (Array.isArray(patterns)){
    patterns.forEach(value => {
      const {pattern, ...rest} = value
      rules.push({pattern:  RegExp(pattern), ...rest})
    })
  }
  return rules
}
export const getFormItemProps = (config: any, _default?: any) : [props: FormItemProps, rest: any] => {
  config = getConfig(config)
  _default = getConfig(_default)
  let {label, width, required, patterns, ...rest} = config

  label = label || _default?.label
  width = width || _default?.width
  
  required = required || _default?.required
  const rules = getFormItemRules(required, patterns)

  return [{label, style: {width}, rules}, rest]
}

export interface InputConfig extends FormItemConfig {
  props: InputProps
}
export const getInputConfig = (config: any, _default?: any) : InputConfig => {
  const [formItemProps, props] = getFormItemProps(config, _default);
  props.placeholder = props.placeholder || (!formItemProps.label && !props.placeholder) ? _default?.placeholder : undefined
  return{formItemProps, props}
}

export interface InputNumberConfig extends FormItemConfig {
  props: InputNumberProps
}
export const getInputNumberConfig = (config: any, _default?: any): InputNumberConfig => {
  const [formItemProps, props] = getFormItemProps(config, _default)
  props.placeholder = props.placeholder || (!config.label && !props.placeholder) ? _default.placeholder : undefined

  return{formItemProps, props}
}

export interface CheckboxConfig extends FormItemConfig {
  text: string
  props: CheckboxProps
}
export const getCheckboxConfig = (config: any, _default?: any) : CheckboxConfig => {
  config = getConfig(config)
  let {label, ..._config} = config
  label ||= _default?.label
  const [formItemProps, props] = getFormItemProps(_config, _default)
  return{text: label, formItemProps, props}
}

export interface ButtonConfig {
  text: string
  props: ButtonProps
}
export const getButtonConfig = (config: any, _default?: any) : ButtonConfig => {
  config = getConfig(config)
  let {label, width, style, ...props} = config
  style = {
    width: width || _default?.width,
    ...style
  }
  props.style = style
  return {
    text: label || _default?.label || 'Submit',
    props
  }
}

export interface IconConfig {
  props: IconBaseProps
}
export const getIconConfig = (config: any, _default?: any): IconConfig => {
  config = getConfig(config)
  return {props: config}
}

export interface FormConfig {
  type: FormType
  props: FormProps
  title?: TitleConfig
  cancel?: ButtonConfig
  submit: ButtonConfig
}
export const getFormConfig = (config: any, _default: any): FormConfig => {
  config = getConfig(config)
  _default = getConfig(_default)

  let {type, labelSpan, wrapperSpan, maxWidth, align, title, cancel, submit, ...rest} = config
  type = type || _default.type || FormType.default
  maxWidth = maxWidth || _default.maxWidth
  maxWidth = (!maxWidth && type === FormType.default) ? 300 : maxWidth
  align = align || _default.align
  const marginLeft = (align === HorizontalAlignment.center || align === HorizontalAlignment.right) ? 'auto' : undefined
  const marginRIght = (align === HorizontalAlignment.center || align === HorizontalAlignment.left) ? 'auto' : undefined

  const props = rest as FormProps
  props.labelCol = {span: labelSpan || _default.labelSpan}
  props.wrapperCol = {span: wrapperSpan || _default.wrapperSpan}
  props.style = {
    maxWidth,
    marginLeft: marginLeft,
    marginRight: marginRIght,
    ...props.style
  }

  if (type === FormType.default){
    _default.submit ??= {}
    _default.submit.width ||= '100%'
  }

  return {type, props,
    title: title && getTitleConfig(title, _default.title),
    cancel: cancel && getIconConfig(cancel, _default.cancel),
    submit: getButtonConfig(submit, _default.submit)
  }
}

export interface CustomInputConfig {
  type: InputType
  name: string
  config?: any
  defaultConfig?: any
}
export const getCustomInputConfig = (type: InputType, name: string, config: any, _default?: any): CustomInputConfig | undefined => {
  _default = getConfig(_default)
  if (type === InputType.text){
    config = getInputConfig(config, _default)
    return {type, name, config}
  }
  else if (type === InputType.number){
    config = getInputNumberConfig(config, _default)
    return {type, name, config}
  }
}
