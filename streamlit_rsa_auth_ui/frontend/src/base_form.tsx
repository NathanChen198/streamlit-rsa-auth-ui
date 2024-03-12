/*
author: Nathan Chen
date  : 12-Mar-2024
*/


import { ConfigProvider } from "antd";
import React from "react";
import { ComponentProps, ReactNode } from "react";
import { Streamlit, StreamlitComponentBase } from "streamlit-component-lib";
import forge from 'node-forge'

export default abstract class BaseForm extends StreamlitComponentBase{
  private publicKey: forge.pki.rsa.PublicKey | undefined

  constructor(props: ComponentProps<any>){
    super(props);
    const pem = props.args['publicKey']
    if(pem) this.publicKey = forge.pki.publicKeyFromPem(pem)
  }

  abstract getForm(): ReactNode;

  protected setComponentValue(value: any){
    if (!this.publicKey){
      Streamlit.setComponentValue(value)
    }
    else{
      const json = JSON.stringify(value)
      let encrypted = this.publicKey.encrypt(json)
      encrypted = forge.util.encode64(encrypted)
      Streamlit.setComponentValue(encrypted)
    }
  }

  render(): React.ReactNode {
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