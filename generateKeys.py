from streamlit_rsa_auth_ui import Encryptor

encryptor = Encryptor.generateNew(2048)
encryptor.save('rsa', 'authkey')