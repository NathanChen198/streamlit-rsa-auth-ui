import streamlit as st
from streamlit_rsa_auth_ui import Encryptor, SigninEvent, SignoutEvent, getEvent, signinForm, signoutForm
ss = st.session_state


encryptor = Encryptor.load('rsa', 'key')

def checkAuth(username: str, password: str):
    return username == 'test' and password == 'New.Prog'

def login():
    if 'event' in ss and type(ss.event) is SigninEvent: return True
    result = signinForm(encryptor.publicKeyPem, default={'remember': True}, configs={'remember': {}, 'cancel': {}})
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
    result = signoutForm(encryptor.publicKeyPem, configs={'cancel': {}})
    if result is None: return False
    _dict = encryptor.decrypt(result)
    event = getEvent(_dict)
    if type(event) is SignoutEvent:
        del ss['event']
        return True
    return False

if not login(): st.stop()
if logout(): st.rerun()

st.title('Streamlit Rsa Auth UI Test')
st.button('test')