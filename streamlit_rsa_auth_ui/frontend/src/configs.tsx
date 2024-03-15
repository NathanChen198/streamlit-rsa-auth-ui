/*
author: Nathan Chen
date  : 15-Mar-2024
*/


import
{
  FormType,
  HorizontalAlignment, TitleSize,
  getTextAlign, getTitleSize,
} from "./types"
import {
  InputProps,
  FormProps, 
  CheckboxProps,
  ButtonProps,
  FormItemProps
} from "antd"
import { 
  TitleProps
} from "antd/es/typography/Title"

export const getConfig = (config: any): any => (typeof config === 'object') ? config : {}
const getString = (text: any, defaultText: string): string => (typeof text === 'string') ? text : defaultText


export interface TitleConfig{
  text: string
  size: TitleSize
  align: HorizontalAlignment
  props: TitleProps
}
export const getTitleConfig = (config: any, defaultText: string, defaultSize?: TitleSize, defaultAlign?: HorizontalAlignment) : TitleConfig => {
  config = getConfig(config)
  const {text, size, align, ...rest} = config

  return {
    text: getString(text, defaultText),
    size: getTitleSize(size, defaultSize || TitleSize.medium),
    align: getTextAlign(align, defaultAlign || HorizontalAlignment.left),
    props: rest
  } as TitleConfig
}
export function getTitleStyle(config: TitleConfig | undefined): TitleProps['style'] {
  if(!config) return
  const {align, props} = config
  return {
    textAlign: align,
    ...props.style
  }
}

export interface FormItemConfig{
  label?: string
  width?: any
}

export interface InputRule {
  message?: string
  warningOnly?: boolean
}
export interface InputRequired extends InputRule {
  required: boolean
}
export interface InputPattern extends InputRule {
  pattern: string
}
export interface InputConfig extends FormItemConfig {
  required: InputRequired | undefined
  patterns: InputPattern[] | undefined
  props: InputProps
}
export const getInputConfig = (config: any, defaultPlaceholder: string, defaultWidth?: any) : InputConfig => {
  config = getConfig(config)
  const {label, width, required, patterns, ...rest} = config

  rest.placeholder = rest.placeholder || (!label && !rest.placeholder) ? defaultPlaceholder : undefined

  return{
    label: label,
    width: width || defaultWidth,
    required: required || { required: true },
    patterns: patterns,
    props: rest
  }
}
export function getInputFieldRules(config: InputConfig) : FormItemProps['rules'] {
  const rules: FormItemProps['rules'] = []
  if (config.required){
    const {required, ...rest} = config.required
    rules.push({ required: required, ...rest})
  }
  if (config.patterns){
    config.patterns.forEach(value => {
      const {pattern, ...rest} = value
      rules.push({pattern:  RegExp(pattern), ...rest})
    })
  }
  return rules
}
export function getInputStyle (config: InputConfig) : InputProps['style'] {
  return {
    width: config.width,
    ...config.props.style
  }
}

export interface CheckboxConfig extends FormItemConfig {
  props: CheckboxProps
}
export const getCheckboxConfig = (config: any, defaultLabel: string) : CheckboxConfig => {
  config = getConfig(config)
  const {label, width, ...rest} = config

  return {
    label: getString(label, defaultLabel),
    width: width,
    props: rest
  }
}
export const getCheckboxStyle = (config: CheckboxConfig): CheckboxProps['style'] => {
  return {
    width: config.width,
    ...config.props.style
  }
}

export interface ButtonConfig extends FormItemConfig {
  props: ButtonProps
}
export const getButtonConfig = (config: any, defaultLabel: string, defaultWidth?: any) : ButtonConfig => {
  config = getConfig(config)
  const {label, width, ...rest} = config

  return {
    label: getString(label, defaultLabel),
    width: width || (defaultWidth || 'fit-content'),
    props: rest
  }
}
export const getButtonStyle = (config: ButtonConfig): ButtonProps['style'] => {
  return {
    width: config.width,
    ...config.props.style
  }
}

export interface FormConfig {
  labelSpan?: number,
  wrapperSpan?: number,
  maxWidth: any
  align: HorizontalAlignment
  type: FormType
  title?: TitleConfig
  cancel?: ButtonConfig
  props: FormProps
}
export const getFormConfig = (config: any, defaultTitle: string) : FormConfig => {
  config = getConfig(config)
  const {labelSpan, wrapperSpan, maxWidth, align, type, title, cancel, ...rest} = config
  const _type: FormType = type || FormType.default

  if (!rest.labelAlign) rest.labelAlign = 'right' as FormProps['labelAlign']
  if (!rest.autoComplete) rest.autoComplete = 'off' as FormProps['autoComplete']
  return {
    labelSpan: labelSpan,
    wrapperSpan: wrapperSpan,
    maxWidth: maxWidth,
    align: align,
    type: _type,
    title: title && getTitleConfig(title, defaultTitle),
    cancel: cancel && getButtonConfig(cancel, 'Cancel'),
    props: rest
  }
}
export const getFormStyle = (config: FormConfig): FormProps['style'] => {
  const {type, maxWidth, align} = config
  const _maxWidth = (!maxWidth && type === FormType.default) ? 300 : maxWidth
  const marginLeft = (align === HorizontalAlignment.center || align === HorizontalAlignment.right) ? 'auto' : undefined
  const marginRight = (align === HorizontalAlignment.center || align === HorizontalAlignment.left) ? 'auto' : undefined

  return {
    maxWidth: _maxWidth,
    marginLeft: marginLeft,
    marginRight: marginRight,
    ...config.props.style
  }
}
export const getSubmitWidth = (config: FormConfig) : any => {
  if(config.type === FormType.default) return '100%'
  else return undefined
}