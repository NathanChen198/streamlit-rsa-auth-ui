# Author    : Nathan Chen
# Date      : 23-Mar-2024


import json
import os
import streamlit as st
import streamlit.components.v1 as components
from typing import Optional, Union, cast, overload
from .configs import Object, FormConfig, SigninFormConfig, SignoutFormConfig, ChangePasswordFormConfig


_RELEASE = True


if not _RELEASE:
    _componentFunc = components.declare_component("rsa_auth_ui", url="http://localhost:3001")
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _componentFunc = components.declare_component("rsa_auth_ui", path=build_dir)


ss = st.session_state


class AuthUI():
    """ Authentication User Interface

    Properties:
    sessionStateName: str
        To check if the result is the same as previous result
    publicKey: str | None
        Optional public rsa key for encryption at the client browser
    """
    sessionStateName: str
    publicKey: Optional[str]
    def __init__(self, sessionStateName: str, publicKey: Optional[str]) -> None:
        self.sessionStateName = sessionStateName
        self.publicKey = publicKey
        self.returnType = type(str) if publicKey is None else Object

    def __checkFormResult(self, result: Union[str, Object, None]) -> Union[Object, str, None]:
        # Check if the result is the same as previous result
        if self.publicKey is not None and type(result) is str: #If it is encrypted
            if self.sessionStateName in ss and ss[self.sessionStateName] == result: return None
            ss[self.sessionStateName] = result
            return result
        elif self.publicKey is None and type(result) is dict: #If it is not encrypted
            _json = json.dumps(result)
            if self.sessionStateName in ss and ss[self.sessionStateName] == _json: return None
            ss[self.sessionStateName] = _json
            return result
        else: return None

    def __createComponent(self, id: str, default: Optional[Object], configs: Union[Object, FormConfig, None]) -> Union[Object, str, None]:
        configs = configs if type(configs) is dict else configs.toDict() if isinstance(configs, FormConfig) else None
        result = _componentFunc(id = id, publicKey=self.publicKey, default=default, configs=configs)
        result = self.__checkFormResult(result)
        return result

    def signinForm(self, default: Optional[Object] = None, configs: Union[Object, SigninFormConfig, None] = None) -> Union[Object, str, None]:
        return self.__createComponent('signin', default, configs)

    def signoutForm(self, default: Optional[Object] = None, configs: Union[Object, SignoutFormConfig, None] = None) -> Union[Object, str, None]:
        return self.__createComponent('signout', default, configs)

    def changePasswordForm(self, default: Optional[Object] = None, configs: Union[Object, ChangePasswordFormConfig, None] = None) -> Union[Object, str, None]:
        return self.__createComponent('changePassword', default, configs)


class __NoEncryptAuthUI(AuthUI):
    def signinForm(self, default: Optional[Object] = None, configs: Union[Object, SigninFormConfig, None] = None) -> Union[Object, None]:
        result = super().signinForm(default, configs)
        return cast(Object, result) if result is not None else None
    
    def signoutForm(self, default: Optional[Object] = None, configs: Union[Object, SignoutFormConfig, None] = None) -> Union[Object, None]:
        result = super().signoutForm(default, configs)
        return cast(Object, result) if result is not None else None

    def changePasswordForm(self, default: Optional[Object] = None, configs: Union[Object, ChangePasswordFormConfig, None] = None) -> Union[Object, None]:
        result = super().changePasswordForm(default, configs)
        return cast(Object, result) if result is not None else None


class __EncryptAuthUI(AuthUI):
    def signinForm(self, default: Optional[Object] = None, configs: Union[Object, SigninFormConfig, None] = None) -> Union[str, None]:
        result = super().signinForm(default, configs)
        return cast(str, result) if result is not None else None
    
    def signoutForm(self, default: Optional[Object] = None, configs: Union[Object, SignoutFormConfig, None] = None) -> Union[str, None]:
        result = super().signoutForm(default, configs)
        return cast(str, result) if result is not None else None

    def changePasswordForm(self, default: Optional[Object] = None, configs: Union[Object, ChangePasswordFormConfig, None] = None) -> Union[str, None]:
        result = super().changePasswordForm(default, configs)
        return cast(str, result) if result is not None else None
    

@overload
def authUI(sessionStateName: str, publicKey: str) -> __EncryptAuthUI: pass
@overload
def authUI(sessionStateName: str, publicKey: None) -> __NoEncryptAuthUI: pass
def authUI(sessionStateName: str, publicKey: Optional[str]) -> AuthUI:
    """ get Authenticator UI

    ### Arguments
    sessionStateName: str
        To check if the result is the same as previous result
    publicKey: str | None
        Optional public rsa key for encryption at the client browser
    """
    if publicKey is None: return __NoEncryptAuthUI(sessionStateName, publicKey)
    else: return __EncryptAuthUI(sessionStateName, publicKey)