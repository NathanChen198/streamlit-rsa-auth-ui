# Author    : Nathan Chen
# Date      : 15-Mar-2024


import os
import streamlit.components.v1 as components
from typing import Literal, Optional, Union, Any, Dict, overload


_RELEASE = False


if not _RELEASE:
    _componentFunc = components.declare_component("rsa_auth_ui", url="http://localhost:3001")
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _componentFunc = components.declare_component("rsa_auth_ui", path=build_dir)


Object = Dict[str, Any]
ConfigType = Dict[str, Object]
FormLocation = Literal['main', 'sidebar']


def createComponent(id: str, publicKey: Optional[str], default: Optional[Object], configs: Optional[Object]) -> Union[Object, str, None]:
    # location = defaultLocation if configs is None or 'location' not in configs else configs['location']
    # if location is 'sidebar':
    #     with st.sidebar:
    #         result = _componentFunc(id = id, publicKey=publicKey, default=default, configs=configs)
    # else:
    #     result = _componentFunc(id = id, publicKey=publicKey, default=default, configs=configs)

    result = _componentFunc(id = id, publicKey=publicKey, default=default, configs=configs)
    if publicKey is not None and type(result) is not str: return None
    return result


@overload
def signinForm(publicKey: None, default: Optional[Object] = None, configs: Optional[Object] = None) -> Optional[Object]: pass
@overload
def signinForm(publicKey: str, default: Optional[Object] = None, configs: Optional[Object] = None) -> Optional[str]: pass
def signinForm(publicKey: Optional[str] = None, default: Optional[Object] = None, configs: Optional[Object] = None) -> Union[Object, str, None]:
    return createComponent('signin', publicKey, default, configs)


@overload
def signoutForm(publicKey: None, default: Optional[Object] = None, configs: Optional[Object] = None) -> Optional[Object]: pass
@overload
def signoutForm(publicKey: str, default: Optional[Object] = None, configs: Optional[Object] = None) -> Optional[str]: pass
def signoutForm(publicKey: Optional[str] = None, default: Optional[Object] = None, configs: Optional[Object] = None) -> Union[Object, str, None]:
    return createComponent('signout', publicKey, default, configs)


@overload
def changePasswordForm(publicKey: None, default: Optional[Object] = None, configs: Optional[Object] = None) -> Optional[Object]: pass
@overload
def changePasswordForm(publicKey: str, default: Optional[Object] = None, configs: Optional[Object] = None) -> Optional[str]: pass
def changePasswordForm(publicKey: Optional[str] = None, default: Optional[Object] = None, configs: Optional[Object] = None) -> Union[Object, str, None]:
    return createComponent('changePassword', publicKey, default, configs)
