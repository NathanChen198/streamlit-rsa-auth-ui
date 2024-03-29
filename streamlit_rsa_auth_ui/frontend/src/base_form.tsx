/*
author: Nathan Chen
date  : 23-Mar-2024
*/


import { ConfigProvider, FormProps, Typography } from "antd";
import React, { ComponentProps, ReactNode } from "react";
import { Streamlit, StreamlitComponentBase } from "streamlit-component-lib";
import forge from 'node-forge'
import { ButtonConfig, TitleConfig } from "./configs";
import { CloseOutlined } from "@ant-design/icons";

const { Title } = Typography

export default abstract class BaseForm extends StreamlitComponentBase{
  private publicKey: forge.pki.rsa.PublicKey | undefined

  constructor(props: ComponentProps<any>){
    super(props);
    const pem = props.args['publicKey']
    if(pem) this.publicKey = forge.pki.publicKeyFromPem(pem)
  }

  abstract getForm(): ReactNode;
  abstract onCancel: FormProps['onClick'];

  protected getHeader(title: TitleConfig | undefined, cancel: ButtonConfig | undefined): ReactNode | undefined {
    return (title || cancel) &&
    <div className="form-header" style={title?.headerStyle}>
      {
        title &&
        <Title className="form-title" {...title.props}
        >{title.text}</Title>
      }
      {
        cancel &&
        <CloseOutlined className="form-cancel" onClick={this.onCancel}/>
      }
    </div>
  }

  protected setComponentValue(value: any){
    if (!this.publicKey){
      value.id = Math.random()
      Streamlit.setComponentValue(value)
    }
    else{
      const json = JSON.stringify(value)
      let encrypted = this.publicKey.encrypt(json)
      encrypted = forge.util.encode64(encrypted)
      Streamlit.setComponentValue(encrypted)
    }
  }

  render(): ReactNode {
    return <div>
      <ConfigProvider
        theme={{
          token: {
            colorText: this.props.theme?.textColor,
            colorTextPlaceholder: this.props.theme?.font,
            colorPrimary: this.props.theme?.primaryColor,
            colorPrimaryBg: this.props.theme?.primaryColor,
            colorBgBase: this.props.theme?.secondaryBackgroundColor
          }
        }}
      >
        {this.getForm()}
      </ConfigProvider>
    </div>
  }
}