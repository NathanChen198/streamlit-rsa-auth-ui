/*
author: Nathan Chen
date  : 23-Mar-2024
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
