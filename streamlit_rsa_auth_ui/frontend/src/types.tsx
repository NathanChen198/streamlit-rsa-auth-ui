/*
author: Nathan Chen
date  : 12-Mar-2024
*/


export enum FormType{
  default = 'default',
  inline = 'inline',
}

export enum HorizontalAlignment{
  left = 'left',
  right = 'right',
  center = 'center'
}

export enum TextAlign{
  left = 'left',
  right = 'right',
  center = 'center',
  justify = 'justify',
  matchParent = 'match-parent'
}
export const getTextAlign = (align: any, defaultAlign: HorizontalAlignment = HorizontalAlignment.left) : HorizontalAlignment =>
  (typeof align === 'string') ? HorizontalAlignment[align as keyof typeof HorizontalAlignment] : defaultAlign

export enum TitleSize{
  smaller = 5,
  small = 4,
  medium = 3,
  large = 2,
  extraLarge = 1
}
export const getTitleSize = (size: any, defaultSize: TitleSize = TitleSize.medium) : TitleSize => {
  if(typeof size === 'string')
    return TitleSize[size as keyof typeof TitleSize]
  else if(typeof size === 'number')
    return size
  else
    return defaultSize
}

export enum InputType{
  text = "text",
  number = "number",
  boolean = "boolean",
  color = "color",
  date = "date",
  time = "time",
  datetime = "datetime",
  choose_one = "select_one",
  choose_many = "select_many",
}
export const getInputType = (type: any) : InputType | undefined => {
  if(typeof type === 'string')
    return InputType[type as keyof typeof InputType]
  else
    return undefined
}
