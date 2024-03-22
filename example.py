import streamlit as st
from streamlit_rsa_auth_ui import Encryptor, SigninEvent, SignoutEvent, getEvent, authUI, TitleConfig, RequiredRule, PatternRule, TextInputConfig, CheckboxConfig, ButtonConfig, IconConfig, SigninFormConfig
ss = st.session_state

st.set_page_config(layout='wide')

encryptor = Encryptor.load('rsa', 'authkey')
ui = authUI('login_ui_result', encryptor.publicKeyPem)
with st.sidebar:
    ui.signoutForm(configs={
        'title': {
            'text': 'Welcome Chen, Nathan',
            'size': 'smaller',
        },
    })
    st.session_state

event = SigninEvent()
event.remember = False
ui.signinForm(
    configs= SigninFormConfig('inline',
        title='Test Login',
        username=TextInputConfig('Username please', required=False),
        password='Password please',
        remember='Remember',
        forgot='Forgot Password'
        ),
    default=event.__dict__)
st.session_state

ui.changePasswordForm(configs={
    'type': 'inline',
    'title': {},
    'cancel': {},
})
st.session_state

button = st.button('Test')
button