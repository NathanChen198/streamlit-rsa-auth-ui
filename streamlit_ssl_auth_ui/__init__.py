# Author    : Nathan Chen
# Date      : 08-Mar-2024


import os
from datetime import datetime, timedelta
import streamlit as st
import streamlit.components.v1 as components
from typing import Literal, Optional, Union, Any, Dict


_RELEASE = False


if not _RELEASE:
    _login_form = components.declare_component("login_form", url="http://localhost:3001")
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _login_form = components.declare_component("login_form", path=build_dir)



def LoginForm(privateKey: str, publicKey: str):
    return _login_form(privateKey=privateKey, publicKey=publicKey, default={})

