/*
author: Nathan Chen
date  : 11-Mar-2024
*/


import {
  Streamlit,
  withStreamlitConnection,
  StreamlitComponentBase,
} from "streamlit-component-lib";
import React, {
  ComponentProps
} from "react";
import {
  Button,
  Checkbox,
  Form,
  type FormProps,
  Input,
  Space,
} from "antd";
import forge from 'node-forge'


type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

const encryptString = (plaintext:string, publicKeyPem:string) =>{
  console.warn(publicKeyPem)
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  let encrypted = publicKey.encrypt(plaintext);
  encrypted = forge.util.encode64(encrypted)
  return encrypted
}

class LoginForm extends StreamlitComponentBase{
  private publicKey: string

  constructor(props: ComponentProps<any>){
    super(props);
    const args = props.args;
    this.publicKey = args['publicKey']
  }

  private onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    values.password = encryptString(values.password, this.publicKey)
    Streamlit.setComponentValue(values)
  }

  render(): React.ReactNode {
    return(<div>
      <Form
        name = "login"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            placeholder="Please input your username"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="password"
          name="password"
          rules={[{ required:true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Please input your password"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label=" "
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 4, span: 16 }}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>)
  }
}

export default withStreamlitConnection(LoginForm)