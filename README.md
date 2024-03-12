# Welcome to Streamlit RSA Authenticator UI 🔐

[![PyPI][pypi_badge]][pypi_link]
[![Download][pypi_download_badge]][pypi_link]
[![GitHub][github_badge]][github_link]
[![GitHub license][license_badge]][license_link]
[![GitHub issues][issue_badge]][issue_link]
[![GitHub pull requests][pull_badge]][pull_link]

Encryption on Authenticate widget data from client to server.

## What is Streamlit RSA Authenticator UI?
### What is Http protocol
Http is the information transfer protocol between networked devices. However, all the requests and responses are in plaintext, which means that anyone can read them.

If you want to deploy streamlit server using http protocol (not https protocol) and you add the user authentication, user password can be read by anyone in the network as it is the plaintext for http protocol.

`streamlit-rsa-auth-ui` correct it by encrypting user information including password at the client browser before transmit to streamlit server using [RSA algorithm](https://www.techtarget.com/searchsecurity/definition/RSA)

### What is RSA algorithm
It is [asymmetric cryptography](https://www.techtarget.com/searchsecurity/definition/asymmetric-cryptography), uses two different but mathematically linked [keys](https://www.techtarget.com/searchsecurity/definition/key)
- [Public key](https://www.techtarget.com/searchsecurity/definition/public-key) that can be share with everyone
- [Private key](https://www.techtarget.com/searchsecurity/definition/private-key) must be kept secret

## Installation
Open a terminal and run:

``` terminal
pip install streamlit-rsa-auth-ui
```


## Quickstart
### Gnerate RSA Key Pair
Create a new file generateKeys.py

``` python
from streamlit_rsa_auth_ui import Encryptor

encryptor = Encryptor.generateNew(2048)
encryptor.save('rsa', 'authkey')
```

Run `generateKeys.py` python script
``` terminal
python generateKeys.py
```

this will create a private key and public key pair
- private key with the file name `authkey`
- public key with the file name `authkey.pub`

``` md
├── rsa
│   ├── authkey
│   │   authkey.pub
```

### Create streamlit page
Create a new file example.py
``` python
import streamlit as st
from streamlit_rsa_auth_ui import Encryptor, SigninEvent, getEvent, signinForm, signoutForm
ss = st.session_state


encryptor = Encryptor.load('rsa', 'authkey')

def checkAuth(username: str, password: str):
    return username == 'test' and password == 'New.Prog'

def login():
    if 'event' in ss and type(ss.event) is SigninEvent: return True
    result = signinForm(encryptor.publicKeyPem, default={'remember': True}, configs={'remember': {}})
    if result is None: return False
    if 'result' in ss and ss['result'] == result: return False

    ss['result'] = result
    _dict = encryptor.decrypt(result)
    event = getEvent(_dict)
    if type(event) is not SigninEvent or not checkAuth(event.username, event.password): return False
    ss['event'] = event
    del ss['result']
    st.rerun()

def logout():
    result = signoutForm(encryptor.publicKeyPem)
    if result is None: return False
    _dict = encryptor.decrypt(result)
    event = getEvent(_dict)
    ss['event'] = event
    return True

if not login(): st.stop()
if logout(): st.rerun()

st.title('Streamlit Rsa Auth UI Test')
st.button('test')
```

Run the streamlit app
``` terminal
streamlit run example.py
```


## Change Log
### Version 0.0.1
- Initial release


[pypi_badge]: https://img.shields.io/pypi/v/streamlit-rsa-auth-ui.svg
[pypi_link]: https://pypi.org/project/streamlit-rsa-auth-ui
[pypi_download_badge]: https://static.pepy.tech/badge/streamlit-rsa-auth-ui
[github_badge]: https://badgen.net/badge/icon/GitHub?icon=github&color=black&label
[github_link]: https://github.com/NathanChen198/streamlit-rsa-auth-ui
[license_badge]: https://img.shields.io/badge/Licence-MIT-gr.svg
[license_link]: https://github.com/NathanChen198/streamlit-rsa-auth-ui/blob/main/LICENSE
[issue_badge]: https://img.shields.io/github/issues/NathanChen198/streamlit-rsa-auth-ui
[issue_link]: https://github.com/NathanChen198/streamlit-rsa-auth-ui/issues
[pull_badge]: https://img.shields.io/github/issues-pr/NathanChen198/streamlit-rsa-auth-ui
[pull_link]: https://github.com/NathanChen198/streamlit-rsa-auth-ui/pulls