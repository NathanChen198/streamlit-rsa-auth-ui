import rsa
import base64
import streamlit as st
from streamlit_ssl_auth_ui import LoginForm
from streamlit_ssl_auth_ui.util import generateKeyPair


with open('ssh/key', 'rb') as f:
    bytes = f.read()
    privateKey = bytes.decode()
    print(privateKey)

with open('ssh/key.pub', 'rb') as f:
    bytes = f.read()
    publicKey = bytes.decode()
    print(publicKey)

def decrypt(encrypted: str):
    key = rsa.PrivateKey.load_pkcs1(privateKey.encode())
    return rsa.decrypt(encrypted.encode(), key)

# with st.sidebar:
values = LoginForm(privateKey=privateKey, publicKey = publicKey)
print()
print(values)
try:
    password: str = values['password']
    base64_bytes = password.encode()
    bytes = base64.b64decode(base64_bytes)
    key = rsa.PrivateKey.load_pkcs1(privateKey.encode())
    values['password'] = rsa.decrypt(bytes, key).decode()
    print(values)
except: pass
finally: pass
